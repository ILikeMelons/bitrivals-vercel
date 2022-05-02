import {checkAddress, loadSheet} from "../../../backend/google/services"

export default async function check(req, res) {
    const {address} = req.body;
    (address);
    await loadSheet();
    const isValid = await checkAddress(address);
    (isValid);
    return res.status(200).json(isValid);
}