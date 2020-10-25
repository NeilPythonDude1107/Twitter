function setUser() {
    axios.post('http://localhost:500/api/account', {
        user: localStorage.getItem('User')
    })
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err.response.data.error)
    })
}