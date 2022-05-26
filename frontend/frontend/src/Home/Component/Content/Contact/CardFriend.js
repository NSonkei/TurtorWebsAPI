import styles from "../Content.module.scss"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
function CardFriend({userid}){
    //classes
    const cardFriendClasses = clsx(styles.cardFriend)
    const [user,setUser] = useState({})
    const element = useRef()
    //Effect
    useEffect(()=>{
        fetch(`http://localhost:8080/api/user/${userid}`,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(rp => rp.json())
        .then(data => setUser(data))
    },[])
    //Function
    function addRequestHandle(){
        const request = {
            "requester":localStorage.getItem('user')
        }
        fetch(`http://localhost:8080/api/user/addFriendRequest/${userid}`,
        {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(request)
        }).then(rp => rp.json)
        .then(data => {
            element.current.remove()
        })
        .catch(err => new Error(err))
    }
    function refuseHintFriend(){
        const request = {
            "userid":localStorage.getItem('user')
        }
        fetch(`http://localhost:8080/api/user/beRefuse/${userid}`,
        {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(request)
        }).then(rp => rp.json)
        .then(data => {
            element.current.remove()
        })
        .catch(err => new Error(err))
    }
    return(
        <div className={cardFriendClasses} ref={element}>
            <img src={user.avatar}></img>
            <h2>{user.firstName}</h2>
            <div className={styles.groupBtn}>
                <button className={styles.blue} onClick={()=>addRequestHandle()}>Add</button>
                <button onClick={()=>refuseHintFriend()}>Refuse</button>
            </div>
        </div>
    )
}

export default CardFriend