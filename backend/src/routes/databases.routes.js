import { Router } from 'express';
import { 
    createDatabase,
    deleteDatabase,
    initBackup
} from "../controllers/databases.controller.js";

const router =  Router();

router.post('/create', createDatabase );
router.delete('/delete', deleteDatabase );
router.post('/backup', initBackup )

export default router;