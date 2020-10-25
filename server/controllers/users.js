const mongoose = require("mongoose");
const User = mongoose.model("User");
const Tweet = mongoose.model("Tweet");

exports.registerController = (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.status(422).json({
        error: "A user with this username already exists!",
        user,
      });
    }
    User.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(422).json({
          error: "A user with this email already exists!",
          user,
        });
      }
      const userData = new User({
        username,
        email,
        password,
      });

      userData
        .save()
        .then((user) => {
          return res.json({
            message: "Signed up Successfully!",
            user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (password === user.password) {
        return res.json({
          message: "Logged In Successfully!",
          user,
        });
      }
      return res.status(422).json({
        error: "Oops! Looks like you entered the wrong details!",
      });
    }
    return res.status(422).json({
      error: "Oops! Looks like you entered the wrong details!",
    });
  });
};

exports.accountController = (req, res) => {
  const { user } = req.body;

  User.findOne({ username: user }).then((user) => {
    if (user) {
      return res.json({
        user,
      });
    }
    return res.status(422).json({
      error: "This user doesnt exist!",
    });
  });
};

exports.editDetailsController = (req, res) => {
  const { image, username } = req.body;
  function editPic(username) {
    Tweet.find({ postedByUsername: username })
      .then((tweets) => {
        User.findOne({ username: username })
          .then((user) => {
            let tweetsArray = [];
            tweets.forEach((tweet) => {
              tweet.postedBy = user;
              tweet.save().then((tweet) => {
                tweetsArray.push(tweet);
              });
            });
            return res.json({
              tweets: tweetsArray,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  User.findOneAndUpdate({ username: username }, { image: image })
    .then((user) => {
        return editPic(user.username)
    })
    .catch((err) => {
      console.log(err);
    });
};
