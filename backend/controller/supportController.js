require('dotenv').config()
const User = require('../usermodels/supportmodules')


const support = async (req, res) => {

    const { name, phone, priority, category, description } = req.body
    try{

        if(!name || !phone || !priority || !category || !description) {
            throw Error('All fields must be filled')
        }

        if(priority === 'null') {
            throw Error('Select priority from the list')
        }

        if(category === 'null') {
            throw Error('Select category from the list')
        }

        await User.create({ name, phone, priority, category, description })
        res.status(200).json({message: 'New Support Call Received'})

    } catch(err) {

        res.status(400).json({error: err.message})
    }
    
    
}

module.exports = { support }