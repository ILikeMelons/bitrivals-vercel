import {addValueSpent, loadSheet} from "../../../backend/google/services"

export default async function update(req, res) {
    const {address, ammount} = req.body;
    (address);
    await loadSheet();
    const isValid = await addValueSpent(address, ammount);
    (isValid);
    return res.status(200).json(isValid);
}