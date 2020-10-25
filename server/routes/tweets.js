const express = require('express')
const router = express.Router()

const {tweetController, getAllTweets, commentOnTweet, userTweets} = require('../controllers/tweets')

router.post('/post/tweet', tweetController)
router.post('/get/tweets', getAllTweets)
router.post('/tweet/comment', commentOnTweet)
router.post('/get/user/tweets', userTweets)


module.exports = router