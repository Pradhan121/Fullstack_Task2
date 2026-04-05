const express = require('express')
const router = express.Router()
const multer = require('multer')

const getAuthCntrl = require('../controller/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.get('/getAuth', getAuthCntrl.getAllUser);
router.post('/register', upload.single('profile'), getAuthCntrl.register);
router.post('/login', getAuthCntrl.login)

module.exports = router;