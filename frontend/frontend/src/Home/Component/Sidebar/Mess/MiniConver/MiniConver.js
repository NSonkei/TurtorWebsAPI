import styles from "../Mess.module.scss"
import { useEffect, useState } from "react"
import {getInfoUser, getMess} from "../../../../../Global/API"
import {actionsNav, useNav } from "../../../../../Global/State/Nav"
import clsx from "clsx"
function MiniConver({conver,infoUser,highlight,index}){
    //Use State
    const [lastMess,setLastMess] = useState('')
    const [infoPartner,setInfoPartner] = useState({})
    const [navState,dispatchNav] = useNav()
    //Classes
    const miniConverClasses = clsx(styles.miniConver,{
        [styles.fill]: highlight === index
    })
    const avatarClasses = clsx(styles.avatar,'avatar')
    //Effect 
    useEffect(()=>{
        const userNameOfPartner = conver.userInCon.find(value => infoUser.userId !== value)
        const lastMessId = conver.messages[conver.messages.length-1]
        getInfoUser(userNameOfPartner).then(data => setInfoPartner(data))
        if (lastMessId) getMess(lastMessId).then(data => setLastMess(data))
    },[])
    //function
    function handleClickMiniCon(){
        dispatchNav(actionsNav.navMessMess(
            {
                conver,
                infoPartner
            }
        ))
    }
    return (
        <div 
            className={miniConverClasses}
            onClick={()=>handleClickMiniCon()}>
                <img className={avatarClasses} alt="avatar" src={conver.groupAvatar ? conver.groupAvatar : infoPartner.avatar}></img>
                <h2>{conver.groupName ? conver.groupName : infoPartner.firstName}</h2>
                {lastMess.fromUser ? <p>{lastMess.fromUser} : {lastMess.content}</p> : <p>Hey! Say something in this conversation</p>}
        </div>
    )
}
export default MiniConver