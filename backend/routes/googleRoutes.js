import {Router} from 'express'
import passport from 'passport';

const router = Router();
router.get('/auth/google',
    passport.authenticate('google',{
        scope:['profile','email'],
        prompt:'select_account'
    })
)

router.get('/auth/google/callback',
    passport.authenticate('google',{
        successRedirect:'http://localhost:5173/blogPage',
        failureRedirect:'http://localhost:5173/login'
    })
)

export default router;