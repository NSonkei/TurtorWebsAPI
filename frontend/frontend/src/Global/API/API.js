const address = "http://localhost:8080"
export async function postLogin(username,password){
    const body = {username,password}
    localStorage.clear()
    await fetch(`${address}/api/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    }).then(rp=>rp.json())
    .then(data => {
        localStorage.setItem('token',data.accessToken)
        localStorage.setItem('user',username)
    })
    .catch(err => {
        new Error("Loi")
        return ""
    })
    return localStorage.getItem('token')
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

export function addUser(user){
    fetch(`${address}/api/register`,
    {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    }).catch(err => new Error("Dang ky khong thanh cong"))
}

export async function getInfoUser(username){
    let body = {}
    await fetch(`${address}/api/user/${username}`,
    {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(rp => rp.json())
    .then(data => {
        body = data})
    return body
}

export async function getAllConversationByUsername(username){
    let body = {}
    await fetch(`${address}/api/conversations/${username}`,
    {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(rp => rp.json())
    .then(data => {
        body = data})
    return body
}

export async function getMess(messId){
    let body = {}
    await fetch(`${address}/api/mess/${messId}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(rp => rp.json())
    .then(data => body = data)
    return body   
}

export function deleteConver(converId,userId){
    fetch(`${address}/api/conversation/${converId}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({"isDelete":userId})
    })
    .catch(err => new Error(err))
}

export async function getAllContact(userId){
    let body = []
    await fetch(`${address}/api/contact/${userId}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
    }).then(rp => rp.json())
    .then(data => body = data)
    .catch(err => new Error(err))
    return body
}

export function createGroupConversation(infoGroup){
    fetch(`${address}/api/conversation/add/group`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(infoGroup)
    }).catch(err => new Error(err))
}

export function addParticipateToGroup(idCon,listParticipate){
    const body = {"user":listParticipate}
    fetch(`${address}/api/conversation/add/participateToGroup/${idCon}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(body)
    }).catch(err => new Error(err))   
}

export function changeGroupName(idCon, newName){
    const body = {"groupName":newName}
    fetch(`${address}/api/conversation/u/groupName/${idCon}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(body)
    }).catch(err => new Error(err))  
}