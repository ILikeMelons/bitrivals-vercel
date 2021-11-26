import {checkRivalID, insertRivalID, insertUserShareCode, getUserRivalID} from '../../../backend/Supabase'


export default async function registerRivalID(req, res) {
    // destructure the e-mail and password received in the request body.
    const { id, rivalID, email } = req.body;
    let  validID = false;
    const idData = await checkRivalID(rivalID);

 
    if(idData.data == 0){
        validID = true
    }

    if(validID == false){
        return res.status(200).json({validID : validID});
    }
    

    let {d, e} = await insertRivalID(id, rivalID, email);
    let {data, err} = await getUserRivalID(id);
 
    let code = await insertUserShareCode(id);
    //console.log(data[0].rivalid)
    return res.status(200).json({validID : validID, invitation : code, rivalID : data[0].rivalid})
  }