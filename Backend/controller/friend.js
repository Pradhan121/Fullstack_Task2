const friendMdl = require('../models/friend')
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

exports.createFriend = async(req,res)=>{
    try{
        const friendBody = req.body

        const createFriend = await friendMdl.create(friendBody)
         sendMail(createFriend.email)
        
        res.status(201).json({
            status: "Success",
            message: 'account created successful',
            data: createFriend
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.viewFriendData = async(req,res)=>{
    try{
        const getData = await friendMdl.find()

        res.status(200).json({
            status: "Success",
            message: 'data fetched successful',
            data: getData
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
    
}

exports.updateFriend = async(req,res)=>{
    try{
        const editId = req.params.id

        const updateData = await friendMdl.findByIdAndUpdate(editId, req.body, {new: true})

        res.status(200).json({
            status: "Success",
            message: 'data updated successful',
            data: updateData
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.deleteData = async(req,res)=>{
    try{
        const deleteId = req.params.id

      const deleteData = await friendMdl.findByIdAndDelete(deleteId)
      res.status(200).json({
            status: "Success",
            message: 'data deleted successful',
            data: deleteData
        })
    }
    catch(err){
        res.status(401).json({
            status: 'Fail',
            message: err.message
        })
    }
}