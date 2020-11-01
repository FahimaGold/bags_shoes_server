import {Router, Request, Response} from 'express';
import {ProductRouter} from './product/routes/product.router';

const router: Router = Router();

router.use('/product', ProductRouter);

router.get('/', async(req: Request, res: Response) => {
    res.send('V0');
});

export const IndexRouter: Router = router;