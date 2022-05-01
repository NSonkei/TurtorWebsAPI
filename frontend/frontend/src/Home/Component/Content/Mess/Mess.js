import styles from "../Content.module.scss"
import clsx from "clsx"
import { useEffect, useState } from "react"
import {actionsNav,useNav} from "../../../../Global/State/Nav"
import ChatLine from "./ChatLine/ChatLine"
function Mess(){
    //useNav
    const [navState,dispatchNav] = useNav()
    const [partner, setPartner] = useState({})
    const [conver, setConver] = useState({})
    //Classes
    const headerContentClasses = clsx(styles.headerContent)
    const avatarClasses = clsx(styles.avatar,'avatar')
    const contentMessContainerClasses = clsx(styles.contentMessContainer)
    const messagesClasses = clsx(styles.messages)
    const bodyContentClasses = clsx(styles.bodyContent)
    const messBoxClasses = clsx(styles.messBox)
    const chatBoxClasses = clsx(styles.chatBox)
    const infoClasses = clsx(styles.info)
    const headerInfoClasses = clsx(styles.headerInfo)
    const bodyInfoClasses = clsx(styles.bodyInfo)
    const buttonModalClasses = clsx(styles.buttonModal)
    //Effect
    useEffect(()=>{
        setPartner(navState.messContent.infoPartner)
        setConver(navState.messContent.conver)
        const inp = document.getElementById("ipChat")
        inp.value = ""
    },[navState.messContent])
    return (
            <div className={contentMessContainerClasses}>
                <div className={messagesClasses}>
                    <div className={headerContentClasses}>
                        <img className={avatarClasses} src={conver.groupAvatar || partner.avatar}></img>
                        <h2>{conver.groupName || partner.firstName}</h2>
                    </div>
                    <div className={bodyContentClasses}>
                        <div className={messBoxClasses}>
                            {(conver.messages) ? conver.messages.map((mess,index) => <ChatLine key={index} mess={mess} order={conver.messages.length-index}></ChatLine>) : <div></div>}
                        </div>
                        <div className={chatBoxClasses}> 
                            <input id="ipChat" type="text"></input>
                            <button className="btn"> Send </button>
                        </div>
                    </div>
                </div>
                <div className={infoClasses}>
                    <div className={headerInfoClasses}>
                        <img className={avatarClasses} src={conver.groupAvatar || partner.avatar}></img>
                        <h2>{conver.groupName || partner.firstName}</h2>
                    </div>
                    <div className={bodyInfoClasses}>
                        <div className={buttonModalClasses}>
                            <i className="bi bi-person-plus"></i>
                            <span>Add person</span>
                        </div>
                        {conver.groupName && 
                        <div className={buttonModalClasses}>
                            <i className="bi bi-list"></i>
                            <span>Participater</span>
                        </div>
                        }
                        <div className={buttonModalClasses}>
                            <i className="bi bi-trash" style={{color:"rgb(196, 27, 27)"}}></i>
                            <span className={styles.red}>Delete this conversation</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Mess