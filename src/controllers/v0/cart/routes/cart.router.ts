import { Router, Request, Response } from 'express';
import { Cart } from '../models/Cart';
import {Product } from '../../product/models/Product'
import { requireAuth } from '../../users/routes/auth.router';
const router: Router = Router();


//Retrieving all products in cart for a given user
router.get('/:id', async(req: Request, res: Response)=>  {
    let { id } = req.params;

    console.log("retrieving user " + id + " products in cart");
    if ( !id ) {
        return res.status(400)
                  .send(`id is required`);
      }

    /*const items = await Cart.findAndCountAll({order: [['id','DESC']]});
    items.rows.map((item) => {
       
    });*/

    //const items = await Cart.findAll({where: { userId: id}});
    
    const items = Product.findAll({ include: [ Cart ] }).then(result => {
        console.log("items " + result);
       
       });
    

    res.status(200).send(items);
})

//Adding product to a given user's shopping cart.
router.post('/add', requireAuth, async(req: Request, res: Response)=>  {

    let {userId, productId} = req.body;

    const newElement = await new Cart({
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
export const CartRouter: Router = router;