axios
  .post("http://localhost:5000/api/profile", {
    user: localStorage.getItem("User"),
  })
  .then((res) => {
    const user = res.data.user;
    document.getElementById("image").innerHTML = `<img src=${user.image}>`;
    document.getElementById(
      "website"
    ).innerHTML = `https://${user.username}.com`;
    document.getElementById(
      "bio"
    ).innerHTML = `This is ${user.username}'s bio!`;
    document.getElementById("display__name").innerHTML = `@${user.username}`;
    document.getElementById("username").innerHTML = `${user.username}`;
  })
  .catch((err) => {
    console.log(err.response.data.error);
  });

function logoutUser() {
  localStorage.removeItem("User");
  window.location.replace("/login");
}
function getUserTweets() {
  axios
    .post(`http://localhost:5000/api/get/user/tweets`, {
      user: localStorage.getItem("User"),
    })
    .then((res) => {
      if (res.data.tweets) {
        res.data.tweets.forEach((tweet) => {
          const divClass = document.createElement("div");
          var html = `
                <div class="tweet-block">
                  <img src=${tweet.postedBy.image} alt="profile photo" id='user__image__tweet' />
                  <span class="tweet-content"><span class="display-name">${tweet.postedBy.username}</span>•<span class="username">${tweet.postedBy.username}</span><span class="timestamp">${tweet.createdAt}</span><br>${tweet.body}</span>
                  <div class="tweet-links">
                  <span class="reply-tweet-link"><a href="#"><img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533134295/speech-bubble.png" alt="reply tweet" /></a></span>
                  <span class="retweet-tweet-link"><a href="#"><img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533134296/retweet.png" alt="retweet tweet" /></a></span>
                  <span class="like-tweet-link"><a href="#"><img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533134295/star.png" alt="like tweet" /></a></span>
                  </div>
                </div>
                `;
          var Imagehtml = `
                    <div class="tweet-block">
                      <img src=${tweet.postedBy.image} alt="profile photo" id='user__image__tweet' />
                      <span class="tweet-content"><span class="display-name">${tweet.postedBy.username}</span>•<span class="username">${tweet.postedBy.username}</span><span class="timestamp">${tweet.createdAt}</span><br>${tweet.body}</span><br><img src=${tweet.image} id='post__image'>
                      <div class="tweet-links">
                      <span class="reply-tweet-link"><a href="#"><img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533134295/speech-bubble.png" alt="reply tweet" /></a></span>
                      <span class="retweet-tweet-link"><a href="#"><img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533134296/retweet.png" alt="retweet tweet" /></a></span>
                      <span class="like-tweet-link"><a href="#"><img src="https://res.cloudinary.com/jorpdesigns/image/upload/v1533134295/star.png" alt="like tweet" /></a></span>
                      </div>
                    </div>
                    `;
          if (tweet.image) {
            divClass.innerHTML = Imagehtml;
            const div = document.getElementById("tweets");
            div.appendChild(divClass);
          } else {
            divClass.innerHTML = html;
            const div = document.getElementById("tweets");
            div.appendChild(divClass);
          }
        });
      }
    });
}

getUserTweets();
