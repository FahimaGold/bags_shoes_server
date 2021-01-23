import { Router, Request, Response } from 'express';
import { Cart } from '../models/Cart';
import {Product } from '../../product/models/Product';
import {User } from '../../users/models/User';
import { requireAuth } from '../../users/routes/auth.router';
const router: Router = Router();


//Retrieving all products in cart for a given user
router.get('/:id', requireAuth ,async(req: Request, res: Response)=>  {
    let { id } = req.params;

    console.log("retrieving user " + id + " products in cart");
    if ( !id ) {
        return res.status(400)
                  .send(`id is required`);
      }

    const items  = await User.findAll<User>({
        where: { id: id },
        include: [
            { model: Product, as: 'products', through: { attributes: [] } },
        ]
    });

    console.log(items[0].products);

    res.status(200).send(items[0].products);
})

//Adding product to a given user's shopping cart.
router.post('/add', requireAuth, async(req: Request, res: Response)=>  {

    let {userId, productId} = req.body;

    const newElement = new Cart({
        userId: userId,
        productId: productId
    });
    console.log("userId==> " + userId + "---ProductId==> " + productId);

    //Checking if product is already in Cart
    const checkElem = await Cart.findOne({where: { userId: userId, productId: productId }});
    if(checkElem){
       return res.status(200).send({response:  "Product " + productId  + " is already in cart!"});
    }
      
    await newElement.save();
    res.status(200).send({response:  "Product " + productId  + " added to Cart!"});
} )

//Deleting a product from Cart
router.delete('/remove', async(req: Request, res: Response)=> {
    let {user_id, product_id} = req.query;
    console.log("delete from cart " + user_id +" Product " + product_id);
    await Cart.destroy({where:{userId:user_id, productId: product_id}});


});

export const CartRouter: Router = router;