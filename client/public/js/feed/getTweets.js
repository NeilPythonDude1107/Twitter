function getUser() {
  axios.post('http://localhost:5000/api/profile', {
    user: localStorage.getItem('User')
  })
  .then(res => {
    user = res.data.user
    document.getElementById('image').innerHTML = 
    `
    <img src=${user.image} class='image' />
    `
    document.getElementById('textbox').placeholder = `What's happening, ${user.username}?`
  })
}

getUser()

function getComments(array, random) {
  console.log(random);
  array.forEach((comment) => {
    var div = document.createElement("div");
    var html = `
    <div>
        <b><i><h2 class='h2'>${comment.user.username}:</h2></i></b>
        <h3 class='h3'>${comment.body}</h3>
    </div>
    `;
    div.innerHTML = html;
    div.classList.add("comments");
    document.getElementById(`comments-div-${random}`).appendChild(div);
  });
}

  axios.post("http://localhost:5000/api/get/tweets").then((res) => {
    const tweetbox = document.getElementById("tweets");
    res.data.tweets.forEach((tweet) => {
      const random = Math.floor(Math.random() * 1000000);
      var div = document.createElement("div");
      var bodyHtml = `
        <div class="post">
          <div class="post__avatar">
            <img src=${tweet.postedBy.image} class='comment__image' />
          </div>
          <div class="post__body">
            <div class="post__header">
              <div class="post__headerText">
                <h3 onclick="window.location.replace('/user/${tweet.postedBy.username}')" class='user__link'>
                  ${tweet.postedBy.username}
                  <span class="post__headerSpecial">
                    ${tweet.createdAt}
                  </span>
                </h3>
              </div>
              <div class="post__headerDescription">
                <p>${tweet.body}</p>
              </div>
            </div>
            <div class="post__footer">
              <i class='far fa-comment fa-2x'></i>
              <i class='fas fa-redo fa-2x'></i>
              <i class='fas fa-heart fa-2x like'></i> 
              <i class='fas fa-upload fa-2x'></i>
            </div>
            <div class='comment__input'>
              <input type='text' class='post__comment' id='comment__box-${random}'>
              <button class="sidebar__tweet comment__button" type='submit' onclick='(e) => e.preventDefault(); postComment("${tweet._id}", ${random})'>
                Comment
              </button>
            </div>
            <div id='comments-div-${random}'>
              
            </div>
          </div>
        </div>
        `;
      var imageHtml = `
        <div class="post">
          <div class="post__avatar">
            <img src=${tweet.postedBy.image} class='image' />
          </div>
          <div class="post__body">
            <div class="post__header">
              <div class="post__headerText">
                 <h3 onclick="window.location.replace('/user/${tweet.postedBy.username}')" class='user__link'>
                  ${tweet.postedBy.username}
                  <span class="post__headerSpecial">
                    ${tweet.createdAt}
                  </span>
                </h3> 
              </div>
              <div class="post__headerDescription">
                <p>${tweet.body}</p>
              </div>
              <img src=${tweet.image} class='post__image'>
            </div>
            <div class="post__footer">
              <i class='far fa-comment fa-2x'></i>
              <i class='fas fa-redo fa-2x'></i>
              <i class='fas fa-heart fa-2x like'></i> 
              <i class='fas fa-upload fa-2x'></i>
            </div>
            <div class='comment__input'>
            <input type='text' class='post__comment' id='comment__box-${random}'>
            <button class="sidebar__tweet comment__button" type='submit' onclick='(e) => e.preventDefault(); postComment("${tweet._id}", ${random})'>
              Comment
            </button>
            </div>
            <div id='comments-div-${random}'>
              
            </div>
          </div>
        </div>
        `;
      let html;

      if (tweet.image) {
        html = imageHtml;
        div.innerHTML = html;
        tweetbox.appendChild(div);
        return getComments(tweet.comments, random);
      }
      html = bodyHtml;
      div.innerHTML = html;
      tweetbox.appendChild(div);
      getComments(tweet.comments, random);
    });
  });

if (!localStorage.getItem('User')) {
  window.location.replace('/login')
}


function logoutUser() {
  localStorage.removeItem('User')
  window.location.replace('/login')
}
