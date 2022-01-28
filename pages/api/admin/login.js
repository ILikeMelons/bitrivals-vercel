
export default async function loginUser(req, res) {
    // destructure the e-mail and password received in the request body.
    const { password } = req.body
   
    //console.log(email);
    if(password == '6sM2rVp&rcRw@Fos'){
        return res.status(200).json({success : true});
    }
   
    return res.status(200).json({success : false})
  }
