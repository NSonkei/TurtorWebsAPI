import clsx from "clsx"
import styles from "../../Content.module.scss"
import {getMess} from "../../../../../Global/API"
import {useNav} from "../../../../../Global/State/Nav" 
import { useEffect, useState } from "react"
function ChatLine({mess,order}){
    const [navState,dispatchNav] = useNav()
    //useState

    const [chat,setChat] = useState()
    //classes
    const chatLineEndClasses = clsx(styles.chatLine,styles.end)
    const chatLineStartClasses = clsx(styles.chatLine,styles.start)
    const proactiveClasses = clsx(styles.chatContent,styles.chatContentproactive)
    const passiveClasses = clsx(styles.chatContent,styles.chatContentpassive)
    //useEffect
    useEffect(()=>{
        getMess(mess).then(data=>{
            setChat(data)
        })
    },[])
    //Classes
    return (
        chat &&
        <div order={order} className={chat.fromUser === localStorage.getItem('user') ? chatLineEndClasses : chatLineStartClasses} style={{order:order}}>
            <div className={chat.fromUser === localStorage.getItem('user') ? proactiveClasses : passiveClasses}>
                {chat.content}
            </div>
        </div>
    )
}

export default ChatLine