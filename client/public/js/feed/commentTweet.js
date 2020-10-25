function postComment(postId, random) {
    const body = document.getElementById(`comment__box-${random}`).value

    axios.post('http://localhost:5000/api/tweet/comment', {
        body,
        username: localStorage.getItem('User'),
        tweetId: postId
    })
    .then(res => {
        Toastify({
            text: "Commented!",
            duration: 5000, 
            close: true,
            gravity: "top", // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            backgroundColor: "#03fc13",
            stopOnFocus: true,
        }).showToast();
        window.location.reload()
    })
    .catch(err => {
        console.log(err.response.data.eror)
    })
}