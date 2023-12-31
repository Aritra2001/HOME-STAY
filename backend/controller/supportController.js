require('dotenv').config()
const User = require('../usermodels/supportmodules')


const support = async (req, res) => {

    const { name, phone, priority, category, description } = req.body

    var isnum =  /^\d+$/.test(phone);
    
    try{

        if(!name || !phone || !priority || !category || !description) {
            throw Error('All fields must be filled')
        }

        if(name.length <= 1){
            throw Error('Name should be entered properly')
        }

        if(phone.length < 10 || phone.length > 12 || isnum) {
            throw Error('Enter a valid Phone Number')
        }

        if(priority === 'null') {
            throw Error('Select priority from the list')
        }

        if(category === 'null') {
            throw Error('Select category from the list')
        }

        if(description.length < 10) {
            throw Error('Description have to of minimum 10 words')
        }

        await User.create({ name, phone, priority, category, description })
        res.status(200).json({message: 'New Support Call Received'})

    } catch(err) {

        res.status(400).json({error: err.message})
    }
    
    
}

module.exports = { support }