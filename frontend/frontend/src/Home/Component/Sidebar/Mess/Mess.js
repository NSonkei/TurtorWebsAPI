import clsx from "clsx"
import styles from "./Mess.module.scss"
import {getAllConversationByUsername, getInfoUser} from "../../../../Global/API"
import { useEffect, useState } from "react"
import MiniConver from "./MiniConver/MiniConver"
function Mess({infoUser}){
    //State
    const [conversation,setConversation] = useState([])
    const [highlight,setHighlight] = useState()

    //Classes
    const conversationsClasses = clsx(styles.conversations)
    const headerClasses = clsx(styles.header)
    const bodyClasses = clsx(styles.body)
    //useEffect get API
    useEffect(()=>{
        getAllConversationByUsername(infoUser.userId).then(data => setConversation(data))
    },[infoUser.userId])
    //function
    function clickMiniconHandle(index){
        setHighlight(index)
    }
    return (
        <div className={conversationsClasses}>
            <div className={headerClasses}></div>
            <div className={bodyClasses}>
                {conversation.map((conver,index)=>
               { 
                return (
                    <div key={index} onClick={()=>clickMiniconHandle(index)}>
                        <MiniConver conver={conver} infoUser={infoUser} highlight={highlight} index={index}></MiniConver>
                    </div>
                )}
                )}
            </div>
        </div>
    )
}

export default Mess