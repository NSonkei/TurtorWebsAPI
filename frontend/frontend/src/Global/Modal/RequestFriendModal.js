import styles from "./Modal.module.scss"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import {addParticipateToGroup, createGroupConversation} from "../API"
import {useNav} from "../State/Nav"
function RequestFriendModal({header,setOpen,color}){
    //State
    const [navState,dispatchNav] = useNav()
    const [user,setUser] = useState({})
    //Ref

    //Classes
    const addModalClasses = clsx(styles.addModal)
    const modalBoxClasses = clsx(styles.modalBox)
    const modalHeaderClasses = clsx(styles.modalHeader)
    const modalBodyClasses = clsx(styles.modalBody)
    const personSelectContainerClasses = clsx(styles.personSelectContainer)
    const avatarClasses = clsx("avatar",styles.avatar)
    //Effect
    useEffect(()=>{
        fetch(`http://localhost:8080/api/user/${localStorage.getItem('user')}`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(rp => rp.json())
            .then(data => {
                setUser(data)
                console.log(data.requestFriend)})
        },[])
    //function
    function addFriendHandle(element,friendId){
        const friend = {"friend":friendId}
        fetch(`http://localhost:8080/api/user/addFriend/${localStorage.getItem('user')}`,
            {
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(friend)
            }).catch((err)=> new Error(err))
        element.current.remove()
    }

    function refuseHandle(element,friendId){
        const friend = {"request":friendId}
        fetch(`http://localhost:8080/api/user/refuseRequest/${localStorage.getItem('user')}`,
            {
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(friend)
            }).catch((err)=> new Error(err))
        element.current.remove()
    }

    function CardRequest({requesterId,index}){
        const element = useRef()
        const [participate,setParticipate] = useState({})
        useEffect(()=>{
            fetch(`http://localhost:8080/api/user/${requesterId}`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(rp => rp.json())
            .then(data => {
                setParticipate(data)})
        },[])
        return (
        <div key={index} className={personSelectContainerClasses} ref={element}>
                                <img className={avatarClasses} src={participate.avatar} alt="avatar"></img>
                                <span>{participate.firstName}</span>
                                <label style={{display:"none"}}>{participate.userId}</label>
                                <div className={styles.buttonGroup}>
                                    <button onClick={()=>addFriendHandle(element, participate.userId)}>Agree</button>
                                </div>
                                <i className="bi bi-x" onClick={()=>refuseHandle(element, participate.userId)}></i>
                            </div>)
    }
    return (
        <div className={addModalClasses} onClick={()=>setOpen(false)}>
            <div className={modalBoxClasses} onClick={(ev)=>ev.stopPropagation()}>
            <div className={modalHeaderClasses}>
                    <span style={{color:color}}>{header}</span>
                    <i className="bi bi-x" onClick={()=>{setOpen(false)}}></i>
                </div>
                <div className={modalBodyClasses}>
                    {user.requestFriend && user.requestFriend.map((requester,index)=><CardRequest requesterId={requester} index={index}></CardRequest>)}
                </div>
            </div>
        </div>
    )
}

export default RequestFriendModal