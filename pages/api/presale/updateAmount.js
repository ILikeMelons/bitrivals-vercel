import {addValueSpent, loadSheet} from "../../../backend/google/services"

export default async function update(req, res) {
    const {address, ammount} = req.body;
    console.log(address);
    await loadSheet();
    const isValid = await addValueSpent(address, ammount);
    console.log(isValid);
    return res.status(200).json(isValid);
}