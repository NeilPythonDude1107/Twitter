function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    Toastify({
      text: "Your passwords must match!!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: "#ff0550",
      stopOnFocus: true,
    }).showToast();
  }

  axios
    .post("http://localhost:5000/api/signup", {
      email,
      password,
      username,
    })
    .then((res) => {
      if (res.data.message === "Signed up Successfully!") {
        localStorage.setItem("User", res.data.user.username);
        window.location.replace("/");
        Toastify({
          text: "Signed Up Successfully!",
          duration: 5000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#03fc13",
          stopOnFocus: true,
        }).showToast();
      }
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data.error);
      if (
        err.response.data.error === "A user with this username already exists!"
      ) {
        Toastify({
            text: "A user with that username already exists!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "#ff0550",
            stopOnFocus: true,
          }).showToast();
      }
      if (
        err.response.data.error === "A user with this email already exists!"
      ) {
        Toastify({
            text: "A user with that email already exists!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "#ff0550",
            stopOnFocus: true,
          }).showToast();
      }
    });
}

if (localStorage.getItem("User")) {
  window.location.replace("/");
}
