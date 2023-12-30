require('dotenv').config()
const User = require('../usermodels/supportmodules')

const support = async (req, res) => {

    const { name, phone, priority, category, description} = req.body

    if(!name || !phone || !priority || !category || !description) {
        throw Error('All Fields Must be Filled')
    }

    const support_user = await User.create({ name, phone, priority, category, description })
    .then(() => {
        res.status(200).json({message: 'New Support Call Received'})
    })
    .catch((err) => {
        res.status(400).json({error: err})
    })
}

module.exports = { support }