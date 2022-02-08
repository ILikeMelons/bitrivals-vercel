import passport from '../../../../backend/strategies/passport'
import nc from 'next-connect';

const handler = nc().get(passport.authenticate('steam', { failureRedirect: '/' }), (req,res)=> {
    console.log(req.user)
    res.redirect(`/profile?steam_id=${req.user.id}&steam_name=${req.user.displayName}`);
})

export default handler;