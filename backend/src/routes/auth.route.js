import express from 'express';
import { signup, login, logout } from '../contollers/auth.controllers.js';
import {protect} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);  
router.post('/logout', logout);

router.get('/protect', protect, (req, res) => {
    res.json({ message: 'Protected route accessed successfully', user: req.user });
}
);

export default router;
