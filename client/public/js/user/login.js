function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    axios.post('http://localhost:5000/api/login', {
        email,
        password
    })
    .then(res => {
        if (res.data.message === 'Logged In Successfully!') {
            localStorage.setItem('User', res.data.user.username)
            window.location.replace('/')
            Toastify({
                text: "Logged In Successfully!",
                duration: 5000, 
                close: true,
                gravity: "top", // `top` or `bottom`
                position: 'right', // `left`, `center` or `right`
                backgroundColor: "#03fc13",
                stopOnFocus: true,
            }).showToast();
        }
        console.log(res.data)
    })
    .catch(err => {
        console.log(err.response.data.error)
        if (err.response.data.error === 'Oops! Looks like you entered the wrong details!')
        Toastify({
            text: "Incorrect Credentials! Please check your email/password!",
            duration: 3000, 
            close: true,
            gravity: "top", // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            backgroundColor: "#ff0550",
            stopOnFocus: true,
        }).showToast();
    })
}

if (localStorage.getItem('User')) {
    window.location.replace('/')
}
