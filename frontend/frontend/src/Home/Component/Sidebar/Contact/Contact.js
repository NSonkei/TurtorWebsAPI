import styles from "./Contact.module.scss"
import clsx from "clsx"
import {useNav,actionsNav} from "../../../../Global/State/Nav"
import { Fragment, useEffect , useState} from "react"
import {Confirm, RequestFriendModal, SearchFriend, RightClickMenu} from "../../../../Global/Modal/"
function Contact(){
    const [navState,dispatchNav] = useNav()
    const [infoUser, setInfoUser ] = useState([])
    const [user, setUser] = useState({})
    const [conver, setConver] = useState([])
    const [showRequestFriend, setShowRequestFriend] = useState(false)
    const [showSearchFriend, setShowSearchFriend] = useState(false)
    const [showRightClickMenu, setShowRightClickMenu] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [position, setPosition] = useState({})
    //Classes
    const contactContainerClasses = clsx(styles.contactContainer)
    const personClasses = clsx(styles.person)
    useEffect(()=>{
        // Get User
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
            setInfoUser(data.requestFriend)})
        // Get conversation of user
        fetch(`http://localhost:8080/api/conversations/${localStorage.getItem('user')}`,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(rp => rp.json())
        .then(data => {
            setConver(data)})
        
    },[])
    //function
    function rightButtonMenu(event, personid){
        setShowRightClickMenu(false)
        setPosition({
            x:event.pageX,
            y:event.pageY,
            person: personid,
            element: event.currentTarget
        })
        setShowRightClickMenu(true)
        event.preventDefault()
    }
    
    function deleteFriend(){
        const friend = {friend:position.person}
        fetch(`http://localhost:8080/api/user/deleteFriend/${localStorage.getItem('user')}`,
        {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(friend)
        }).catch((err)=>new Error(err))
        dispatchNav(actionsNav.deleteContact(position.person))
        setShowDeleteConfirm(false)
    }

    function createConversation(){
        const listParticipate = {
            user:[localStorage.getItem('user'),position.person]
        }
        const ok = conver.some(
            (value)=>
            ((value.numberParticipate === 2) && 
            (value.userInCon.some((value)=>value===position.person))))
       if (!ok){
           fetch(`http://localhost:8080/api/conversation/create`,
            {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(listParticipate)
            }).catch((err)=>new Error(err))
        }
        dispatchNav(actionsNav.navMess())
    }
    return (
        <Fragment>
        <div className={contactContainerClasses}>
            <div className={styles.body}>
                {navState.contact.map((con,index)=>{
                    return (
                    <div key={index} className={personClasses} onContextMenu={(ev)=>rightButtonMenu(ev,con.userId)}>
                        <img src={con.avatar}></img>
                        <h2>{con.firstName}</h2>
                    </div>)
                })}
            </div> 
            <div className={styles.footer}>
                <i className="bi bi-person-plus" onClick={()=>setShowRequestFriend(true)}>
                    {infoUser && (infoUser.length > 0 ? <span>!</span> : <span></span>)}
                </i>
                <i className="bi bi-binoculars" onClick={()=>setShowSearchFriend(true)} >
                    
                </i>
            </div>
        </div>
        {showRequestFriend && <RequestFriendModal header={"Request Friend"}
                                                    setOpen={setShowRequestFriend}
                                                    color={"rgb(0,0,0)"}
        ></RequestFriendModal>}
        {showSearchFriend && <SearchFriend header={"Search Friend"}
                                                    setOpen={setShowSearchFriend}
                                                    color={"rgb(0,0,0)"}
        ></SearchFriend>}
        {showRightClickMenu && <RightClickMenu x={position.x} 
            y={position.y} 
            setOpen={setShowRightClickMenu}
            setOpenConfirm={setShowDeleteConfirm}
            createConversation={createConversation}></RightClickMenu>
        }
        {showDeleteConfirm && <Confirm 
                                    header={"Delete Friend"} 
                                    content={"Are you sure to delete this guy away from your friend list ?"} 
                                    color = {"rgb(196, 27, 27)"}
                                    action = {deleteFriend}
                                    setOpen={setShowDeleteConfirm}></Confirm>}
        </Fragment>
    )
}

export default Contact