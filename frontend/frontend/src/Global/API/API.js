const address = "http://localhost:8080"

export function postLogin(setToken,username,password){
    const body = {username,password}
    if (localStorage.getItem('token')) localStorage.removeItem('token')
    fetch(`${address}/api/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    }).then(rp=>rp.json())
    .then(data => setToken(data))
    .catch(err => new Error("Loi"))
}

export function getUser(username,setData){
    var body = {}
    fetch(`${address}/api/user/${username}`,
        {
        method:'GET',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(rp=>rp.json())
    .then(data=>{
        setData(data)
    })
    .catch(err => new Error("Loi Get User"))
    return body
}