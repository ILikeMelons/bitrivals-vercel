
export default async function loginUser(req, res) {
    // destructure the e-mail and password received in the request body.
    const { password } = req.body
   
    
    if(password == process.env.ADMIN_DASHBOARD_PSW){
        return res.status(200).json({success : true});
    }
   
    return res.status(200).json({success : false})
  }
