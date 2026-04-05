const userAuth = require('../models/auth')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "pradhansm2025.katargam@gmail.com",
        pass: "zgfghsolksmyxhje",
    },
});

const sendMail = async(email) => {
    const info = await transporter.sendMail({
        from: 'pradhansm2025.katargam@gmail.com',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?", 
        html: "<b>Hello world?</b>", // HTML version of the message
        // attachments : "",  // file upload of image
    });

    console.log("Message sent:", info.messageId);
}

exports.register = async(req,res)=>{
    try{
        const authBody = req.body
        authBody.password = await bcrypt.hash(authBody.password,10)
        authBody.profile = req.file.filename

        const createUser = await userAuth.create(authBody)
        sendMail(createUser.email)

        res.status(201).json({
            status: "Success",
            message: 'account created successful',
            data: createUser
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.login = async(req,res)=>{
    try{
        const userNameVerify = await userAuth.findOne({username: req.body.username})
         if(!userNameVerify) throw new Error('Invalid Username');

        const passVerify = await bcrypt.compare(req.body.password, userNameVerify.password)
          if(!passVerify) throw new Error('Invalid Password');

        res.status(200).json({
            status: "Success",
            message: 'account created successful',
            data: userNameVerify
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
    
}

exports.getAllUser = async(req,res)=>{
    try{
        const getAuth = await userAuth.find();

      res.status(200).json({
            status: "Success",
            message: 'account created successful',
            data: getAuth
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}