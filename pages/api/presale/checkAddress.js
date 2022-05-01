import {checkAddress, loadSheet} from "../../../backend/google/services"

export default async function check(req, res) {
    console.log('allo')
    const {address} = req.body;
    console.log(address);
    await loadSheet();
    const isValid = await checkAddress(address);
    console.log(isValid);
    return res.status(200).json(isValid);
}