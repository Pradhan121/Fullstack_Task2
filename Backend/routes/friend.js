const express = require('express')
const router = express.Router()

const friendCntrl = require('../controller/friend')

router.get('/friends', friendCntrl.viewFriendData)
router.post('/friends', friendCntrl.createFriend)
router.delete('/friends', friendCntrl.deleteData)
router.put('/friends', friendCntrl.updateFriend)

module.exports = router