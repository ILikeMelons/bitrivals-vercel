import {checkRivalID} from '../../../backend/Supabase';



export default async function validateRivalID(req, res){
    const {rivalID} = req.body;
    const response = checkRivalID(rivalID)
    .then((response)=> {
        return response;
    }).catch((error)=>{
        return error
    });
    

    const result = await response;

	res.status(200).json(result);
}