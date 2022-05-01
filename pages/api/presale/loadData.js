import {loadSheet} from "../../../backend/google/services"

export default async function load(req, res) {
    await loadSheet();    
    return res.status(200).json({loaded : true});
}