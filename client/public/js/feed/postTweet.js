function postTweet() {
  const body = document.getElementById("textbox").value;
  const image = document.getElementById('textbox__image').value
  if (body && !image) {
    axios
      .post("http://localhost:5000/api/post/tweet", {
        body,
        user: localStorage.getItem("User"),
      })
      .then((res) => {
        if (res.data.message === "Tweet Created Successfully!") {
          Toastify({
            text: "Tweeted Successfullly!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "#03fc13",
            stopOnFocus: true,
          }).showToast();
        }
      })
      .catch((err) => {
        Toastify({
          text: err.response.data.error,
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#03fc13",
          stopOnFocus: true,
        }).showToast();
      });
  } else {
    axios
    .post("http://localhost:5000/api/post/tweet", {
      body,
      user: localStorage.getItem("User"),
      image
    })
    .then((res) => {
      if (res.data.message === "Tweet Created Successfully!") {
        Toastify({
          text: "Tweeted Successfullly!",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#03fc13",
          stopOnFocus: true,
        }).showToast();
      }
    })
    .catch((err) => {
      Toastify({
        text: err.response.data.error,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "#03fc13",
        stopOnFocus: true,
      }).showToast();
    });
  }
}
