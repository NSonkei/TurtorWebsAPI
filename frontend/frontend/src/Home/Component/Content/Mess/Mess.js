import styles from "../Content.module.scss"
import clsx from "clsx"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import {actionsNav,useNav} from "../../../../Global/State/Nav"
import {deleteConver} from "../../../../Global/API"
import {Confirm, AddModal, Participater, GroupName} from "../../../../Global/Modal"
import ChatLine from "./ChatLine/ChatLine"
import Stomp from "stompjs"
import SockJS from "sockjs-client"
function Mess(){
    //useNav
    const [navState,dispatchNav] = useNav()
    const [partner, setPartner] = useState({})
    const [conver, setConver] = useState({})
    const [showDeleteConfirm,setShowDeleteConfirm] = useState(false)
    const [showAddModal,setShowAddModal] = useState(false)
    const [showParticipaterModal, setShowParticipaterModal] = useState(false)
    const [showChangeGroupNameModal, setshowChangeGroupNameModal] = useState(false)
    const [contentMess, setContentMess] = useState('')
    const [stompClient,setStompClient] = useState()
    const [messages, setMessages] = useState([])
    const [order, setOrder] = useState(0)
    const refMessBox = useRef()
    //useRef
    const messBox = useRef()
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
    useMemo(()=>{
        var socket = new SockJS("http://localhost:8080/ws")
        setStompClient(()=>{
            var stompClient = Stomp.over(socket)
            stompClient.connect({},()=>onConnected(stompClient),onError)
            return stompClient
        })
    },[])
    useEffect(()=>{
        setPartner(navState.messContent.infoPartner)
        setConver(navState.messContent.conver)
        setMessages(navState.messContent.conver.messages)
        const inp = document.getElementById("ipChat")
        inp.value = ""
        //socket
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
    //Socket

    function onConnected(stompClient) {
        // Subscribe to the Public Topic
        
        stompClient.subscribe('/topic/conver', onMessageReceived);

        // Tell your username to the server
        stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({fromUser: localStorage.getItem('user'), state: 'JOIN'})
        )   
      }
      
      
    function onError(error) {
        console.log(error)
      }

    function onMessageReceived(payload) {
        let mess = JSON.parse(payload.body)
        const ok = messages.some((value)=>value===mess.idMess)
        if (mess.state === 'CHAT' && !ok){
            if (refMessBox.current){
                setMessages((prev)=>{
                    const newPrev = prev.map((value)=>value)
                    newPrev.push(mess.idMess)
                    return newPrev
                })
            }
        }
       }

    function sendMess(event, messInput){
        var messageContent = contentMess
        if(messageContent && stompClient) {
            var chatMessage = {
                fromUser: localStorage.getItem('user'),
                content: messageContent,
                type: 'text',
                toCon: conver.idConver,
                state: 'CHAT'
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        }
        messInput.current.value = ""
        event.preventDefault();
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
                        <div className={messBoxClasses} ref={refMessBox}> 
                            {(messages) ? messages.map((mess,index) => 
                            <ChatLine key={index} mess={mess} order={messages.length-index}></ChatLine>) : <div></div>}
                        </div>
                        <div className={chatBoxClasses}> 
                            <input ref={messBox} id="ipChat" type="text" autocomplete="off" onChange={(ev)=>setContentMess(ev.target.value)}></input>
                            <button className="btn" onClick={(ev)=>sendMess(ev, messBox)}> Send </button>
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
            {showChangeGroupNameModal && <GroupName
                                    header={"Change group name"} 
                                    content={"Oh, let's choose the name for your group "} 
                                    color = {"rgb(0,0,0)"}
                                    conver = {conver}
                                    setOpen={setshowChangeGroupNameModal}></GroupName>}
        </Fragment>
    )
}

export default Mess