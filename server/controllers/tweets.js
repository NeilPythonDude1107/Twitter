const mongoose = require("mongoose");
const { use } = require("../routes/tweets");
const Tweet = mongoose.model("Tweet");
const User = mongoose.model("User");

exports.tweetController = (req, res) => {
  const { body, image, user } = req.body;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  function saveTweetBody() {
    User.findOne({ username: user }).then((user) => {
      if (user) {
        const date = new Date();
        const month = monthNames[date.getMonth()];
        const day = days[date.getDay()];
        const dateNum = date.getDate();
        const createdAt = `${day} ${dateNum} ${month}`;
        const time = date.getTime();
        console.log(createdAt);
        postedBy = user;
        tweetData = new Tweet({
          body,
          postedBy,
          createdAt,
          time,
          postedByUsername: user.username,
        });

        tweetData
          .save()
          .then((tweet) => {
            return res.json({
              message: "Tweet Created Successfully!",
              tweet,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.status(422).json({
          error: "This user doesnt exist!",
        });
      }
    });
  }
  function saveTweetImage() {
    User.findOne({ username: user }).then((user) => {
      if (user) {
        const date = new Date();
        const month = monthNames[date.getMonth()];
        const day = days[date.getDay()];
        const dateNum = date.getDate();
        const createdAt = `${day} ${dateNum} ${month}`;
        const time = date.getTime();
        postedBy = user;
        tweetData = new Tweet({
          body,
          postedBy,
          createdAt,
          time,
          postedByUsername: user.username,
          image
        });

        tweetData
          .save()
          .then((tweet) => {
            return res.json({
              message: "Tweet Created Successfully!",
              tweet,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.status(422).json({
          error: "This user doesnt exist!",
        });
      }
    });
  }
  if (image) {
    console.log('boiber')
    return saveTweetImage()
  } else {
    return saveTweetBody()
  }
};

exports.getAllTweets = (req, res) => {
  Tweet.find()
    .sort("-time")
    .then((tweets) => {
      return res.json({
        tweets: tweets,
      });
    });
};

exports.commentOnTweet = (req, res) => {
  const { body, username, tweetId } = req.body;
  function saveComment(tweetId, data) {
    Tweet.findById(tweetId)
        .then((tweet) => {
          const commentsArray = [];
          const comments = tweet.comments.forEach(comment => {
            commentsArray.push(comment)
          });
          commentsArray.push(data)
          tweet.comments = commentsArray
          tweet.save(tweet, err => {
            if (err) {
              return res.json({
                error: err
              })
            }
            return res.json({
              message: 'Commented Sucessfully!',
              tweet
            })
          })
        })
        .catch((err) => {
          return res.json({
            error: err
          });
        });
  }
  User.findOne({ username: username })
  .then((user) => {
    if (user) {
      const commentData = {
        body: body,
        user: user
      };
      saveComment(tweetId, commentData)
    }
    return false
  })
  .catch((err) => {
    console.log(err);
  });
};


exports.userTweets = (req, res) => {
  const user = req.body.user

  Tweet.find({postedByUsername:user}).sort('-time').then(tweets => {
    if (tweets) {
      return res.json({
        tweets
      })
    }
    return res.json({
      message: 'This user has no tweets yet!'
    })
  })
}