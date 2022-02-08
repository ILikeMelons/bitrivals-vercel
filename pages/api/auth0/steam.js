import passport from '../../../backend/strategies/passport'
import nc from 'next-connect';

const handler = nc().get(passport.authenticate('steam'), (req,res)=> {
    res.redirect('/');
})

export default handler;