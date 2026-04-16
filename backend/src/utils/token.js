import jwt from 'jsonwebtoken';
export const generateToken = (userId, res) => { 
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
        httpOnly: true, 
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    return token;       
}; 
 