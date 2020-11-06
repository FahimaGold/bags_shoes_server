import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';

const router: Router = Router();

//Get All products

router.get('/', async(req: Request, res: Response)=>  {
    const items = await Product.findAndCountAll({order: [['id','DESC']]});
    items.rows.map((item) => {
        if(item.imgUrl){
            //Getting the product Url
        }
    });
    res.status(200)
    .send(items.rows);
})

export const ProductRouter: Router = router;