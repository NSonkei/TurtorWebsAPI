const address = "http://localhost:8080"
export function postLogin(username,password){
    const body = {username,password}
    fetch(`${address}/api/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    }).catch(err => new Error("Loi"))
}