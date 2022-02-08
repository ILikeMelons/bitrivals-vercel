import passport from '../../../backend/strategies/passport'
import nc from 'next-connect';




 const handler = nc().get(passport.authenticate('bnet'), (req,res)=> {
    console.log('allo')
})

export default handler;