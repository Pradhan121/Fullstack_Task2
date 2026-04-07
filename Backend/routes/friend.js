const express = require('express')
const router = express.Router()

const friendCntrl = require('../controller/friend')

router.get('/friends', friendCntrl.viewFriendData)
router.post('/friends', friendCntrl.createFriend)
router.put('/friends/:id', friendCntrl.updateFriend)

module.exports = router