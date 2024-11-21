import { Router } from 'express';
import { 
    advanced,
    aggregation,
    basic
} from "../controllers/queries.controller.js";

const router =  Router();

///// Basic Routes /////
router.get('/basic/:id', basic );

///// Advanced Routes /////
router.get('/advanced/:id', advanced );

///// Aggregation Routes /////
router.get('/aggregation/:id', aggregation );

export default router;