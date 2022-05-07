import styles from "../Content.module.scss"
import clsx from "clsx"
import { Fragment, useEffect, useState } from "react"
import {actionsNav,useNav} from "../../../../Global/State/Nav"
import {deleteConver} from "../../../../Global/API"
import {Confirm,AddModal,Participater} from "../../../../Global/Modal"
import ChatLine from "./ChatLine/ChatLine"
function Mess(){
    //useNav
    const [navState,dispatchNav] = useNav()
    const [partner, setPartner] = useState({})
    const [conver, setConver] = useState({})
    const [showDeleteConfirm,setShowDeleteConfirm] = useState(false)
    const [showAddModal,setShowAddModal] = useState(false)
    const [showParticipaterModal, setShowParticipaterModal] = useState(false)
    const [showChangeGroupNameModal, setshowChangeGroupNameModal] = useState(false)
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
    //function
    function deleteConversation(){
        deleteConver(conver.idConver,localStorage.getItem('user'))
        setShowDeleteConfirm(false)
        dispatchNav(actionsNav.navIntro())
        navState.reRenderSidebar(prev=>{
            console.log(prev)
            if (prev > 100) return prev - 2 
            else return prev + 2
        })
    }
    return (
        <Fragment>
            <div className={contentMessContainerClasses}>
                <div className={messagesClasses}>
                    <div className={headerContentClasses}>
                        <img className={avatarClasses} src={conver.groupAvatar || partner.avatar} alt="avatar"></img>
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
                        <img className={avatarClasses} src={conver.groupAvatar || partner.avatar} alt="avatar"></img>
                        <h2>{conver.groupName || partner.firstName}</h2>
                    </div>
                    <div className={bodyInfoClasses}>
                        <div className={buttonModalClasses} onClick={()=>{setShowAddModal(true)}}>
                            <i className="bi bi-person-plus"></i>
                            <span>Add person</span>
                        </div>
                        {conver.groupName && 
                        <div className={buttonModalClasses} onClick={()=>{setShowParticipaterModal(true)}}>
                            <i className="bi bi-list"></i>
                            <span>Participater</span>
                        </div>
                        }
                        {conver.groupName && 
                        <div className={buttonModalClasses} onClick={()=>{setshowChangeGroupNameModal(true)}}>
                            <i className="bi bi-arrow-clockwise"></i>
                            <span>Change group name</span>
                        </div>
                        }
                        <div className={buttonModalClasses} onClick={()=>{setShowDeleteConfirm(true)}}>
                            <i className="bi bi-trash" style={{color:"rgb(196, 27, 27)"}}></i>
                            <span className={styles.red}>Delete this conversation</span>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteConfirm && <Confirm 
                                    header={"Delete conversation"} 
                                    content={"If you delete it, you will not see it forever. Do you sure ?"} 
                                    color = {"rgb(196, 27, 27)"}
                                    action = {deleteConversation}
                                    setOpen={setShowDeleteConfirm}></Confirm>}
            {showAddModal && <AddModal setOpen={setShowAddModal}
                                        color={"rgb(0,0,0)"}
                                        header = {"Add person"}
                                        conver = {conver}
                                        contact = {navState.contact}
                                        partner = {partner.userId}
                                        ></AddModal>}
            {showParticipaterModal && <Participater setOpen={setShowParticipaterModal}
                                        color={"rgb(0,0,0)"}
                                        header = {"Participater"}
                                        conver = {conver}
                                        contact = {navState.contact}>
                                        </Participater>}
        </Fragment>
    )
}

export default Mess