require('dotenv').config
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { Resend } = require("resend");

const createToken = function (_id) {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '10m'})
}

// Send an email:
const instanceResend = new Resend(process.env.RESEND_API_KEY);

const Schema =  mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetTokenExpire: {
        type: Date
    },
    verifyToken : {
        type: String
    },
    verifyTokenExpire: {
        type: Date,
    },
    verifiedStatus: {
        type: Boolean
    },
    passwordUpdateDate: {
        type: Date
    }
}, {timestamps: true})

// static signup method
userSchema.statics.signup = async function(email, password, confirmpassword) {

    //validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    const mail = await this.findOne({ email })
    if(mail) {
        throw Error('User Already Exits')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not Strong')
    }
    if(password !== confirmpassword)
    {
        throw Error('Password have to be same')
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({email, password: hash})
    const token  = createToken(user._id)
    await this.findByIdAndUpdate(user._id, {verifyToken: token, verifiedStatus: false, verifyTokenExpire: Date.now() + 10 * 60 * 1000})
    const link_verify = `https://www.smartmaintenance.in/signup/${token}`
    
    await instanceResend.emails.send({
        from: 'noreply@smartmaintenance.in',
        to: user.email,
        subject: 'Verify Your Email Address',
        html: `<html>
        <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
        </head>
        <body style="font-family: 'Poppins', sans-serif; font-size: 16px;">
        <div>
        <table style="width: 69.9834%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="width: 100%;">
        <p><span>Hi User,</span></p>
        <p><span>Welcome to your Home Stay account. Please Verify your email here:</span></p>
        <a href="${link_verify}"><button style="border-radius: 7px; background: #008386; color: white; width: 10rem; height: 2rem; border: none; font-weight: bold; font-size: 16px; cursor: pointer">Verify Email</button></a>
        <p>The link is valid for only 10 minutes.</p>
        <p>If you have not registered, just ignore and delete this message.<br/>To keep your account secure, please don't forward this email to anyone.<br/> See our Help Center for&nbsp;<a href="https://smartmaintenance.in" target="_blank" rel="noopener">more security tips.</a></p>
        <span><p>Happy Home Stay!</p></span>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </body>
        </html>`
      });


      const signup = {user: user, token: token }

      return signup

}

//static login method
userSchema.statics.login = async function(email, password) {

    //validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }  

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect Email')
    }

    if(user.verifiedStatus === false) {
        throw Error('Email Not Verified')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user

}

userSchema.statics.finduser = async function(email) {

    if(!email) {
        throw Error('All fields must be filled')
    }

    const usr = await this.findOne({ email })

    if(!usr) {
        throw Error('Email not found')
    }
    else {
        console.log(usr.email, usr._id)
        const token  = createToken(usr._id)
        const hash_token = crypto.createHash('sha256').update(token).digest('hex')
        await this.findByIdAndUpdate(usr._id, {passwordResetToken: hash_token, passwordResetTokenExpire: Date.now() + 10 * 60 * 1000})

        //mail send 
        const link = `https://www.smartmaintenance.in/resetpassword/${token}`


        await instanceResend.emails.send({
            from: 'noreply@smartmaintenance.in',
            to: usr.email,
            subject: 'Home Stay Reset Password',
            html: `<html>
            <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'Poppins', sans-serif; font-size: 16px;">
            <div>
            <table style="width: 69.9834%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
            <tbody>
            <tr>
            <td style="width: 100%;">
            <p><span>Hi User,</span></p>
            <p><span>Someone recently requested a password change for your Home Stay account.<br/>If it was you, you can reset your password here:</span></p>
            <a href="${link}"><button style="border-radius: 7px; background: #008386; color: white; width: 10rem; height: 2rem; border: none; font-weight: bold; font-size: 16px; cursor: pointer">Reset Password</button></a>
            <p>The link is valid for only 10 minutes.</p>
            <p>If you do not want to change your password or did not request this, just ignore and delete this message.<br/>To keep your account secure, please don't forward this email to anyone.<br/> See our Help Center for&nbsp;<a href="https://smartmaintenance.in" target="_blank" rel="noopener">more security tips.</a></p>
            <span><p>Happy Home Stay!</p></span>
            </td>
            </tr>
            </tbody>
            </table>
            </div>
            </body>
            </html>`
          });

        return token
    }

}

userSchema.statics.findbytoken = async function(token, password) {

    const hash_token = crypto.createHash('sha256').update(token).digest('hex')
    const user = await this.findOne({passwordResetToken: hash_token, passwordResetTokenExpire: {$gt: Date.now()}})

    if(!user) {
        throw Error('Token has either expired or is invalid')
    }

    else {

        user.passwordResetToken = undefined
        user.passwordResetTokenExpire = undefined
        user.passwordUpdateDate = Date.now()
        if(!validator.isStrongPassword(password)) {
            throw Error('Password not Strong')
        } 
    
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        user.password = hash
        await user.save()
        
    

    }
    return user

}


module.exports = mongoose.model('User', userSchema)