require('dotenv').config
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { Resend } = require("resend");

const createToken = function (_id) {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '10m'})
}

// Send an email:
const instanceResend = new Resend(process.env.KEY_RESEND);


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

    const email_exits = await this.findOne({ email })

    if(email_exits) {
        throw Error('User already exits')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    
    await instanceResend.emails.send({
        from: 'noreply@smartmaintenance.in',
        to: user.email,
        subject: 'Verify Your Email Address',
        html: `<p>Thank you for signing up with Home stay.<strong> Use the button below to verify your email.</strong></p>
        <!-- Action -->
        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                        <a href='https://www.google.com'><button type='button' target="_blank" style="background: rgb(13 148 136); width: 12rem ; height: 2rem; border-radius: 5px; color: white; font-weight: bold; text-decoration: none; padding: 6px">Verify Email</button></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p>If you did not request a signup, please ignore this email.</p>
        <p>Thanks,
          <br>The Home Stay Team</p>`
      });

    return user

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
            subject: 'Reset password',
            html: `<p>You recently requested to reset your password for your Home stay account. Use the button below to reset it. <strong>This password reset is only valid for the next 10 minutes.</strong></p>
            <!-- Action -->
            <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                            <a href='${link}' ><button type='button' style="background: rgb(13 148 136); width: 15rem ; height: 2rem; border-radius: 5px; color: white; font-weight: bold; text-decoration: none; padding: 6px">Reset Your Password</button></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thanks,
              <br>The Home Stay Team</p>`
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