import {Router} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();
router.get('/auth/google',
    passport.authenticate('google',{
        scope:['profile','email'],
        prompt:'select_account'
    })
)

router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/login' }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h'
    });

    res.cookie('AuthToken', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 
    });
    res.redirect('http://localhost:5173/blogPage');
  }
);


export default router;