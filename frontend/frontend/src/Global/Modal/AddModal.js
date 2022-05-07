import styles from "./Modal.module.scss"
import clsx from "clsx"
import { useEffect, useState } from "react"
import {addParticipateToGroup, createGroupConversation} from "../API"
import {useNav} from "../State/Nav"
function AddModal({header,setOpen,color,contact,conver,partner}){
    let addPeople = []
    //State
    const [avaiableParticipater,setAvaiableParticipater] = useState([])
    const [reRender,setRerender] = useState(0)
    const [navState,dispatchNav] = useNav()
    //Classes
    const addModalClasses = clsx(styles.addModal)
    const modalBoxClasses = clsx(styles.modalBox)
    const modalHeaderClasses = clsx(styles.modalHeader)
    const modalBodyClasses = clsx(styles.modalBody)
    const personSelectContainerClasses = clsx(styles.personSelectContainer)
    const modalFooterClasses = clsx(styles.modalFooter)
    const buttonGroupClasses = clsx(styles.buttonGroup)
    const buttonClasses = clsx(styles.btn)
    const avatarClasses = clsx("avatar",styles.avatar)
    //Effect
    useEffect(()=>{
        addPeople = []
        const result = contact.filter((con)=>{
            return !conver.userInCon.some((value)=>value===con.userId)
        })
        setAvaiableParticipater(result)
    },[reRender])
    //function
    function addPeopleHandle(ev,participate){
        if (ev.classList.contains(styles.fill)){
            ev.classList.remove(styles.fill)
            let indexDele
            addPeople.some((people,index) => {
                indexDele = index
                return people === participate
            })
            addPeople.splice(indexDele,1)
        } else {
            ev.classList.add(styles.fill)
            addPeople.push(participate)
        }
    }

    function createGroupHandle(){
        if (addPeople.length>0){
            conver.userInCon.push(addPeople)
            if (conver.numberParticipate<=2){
                const userInCon = addPeople.splice(0,addPeople.length)
                userInCon.push(localStorage.getItem('user'))
                userInCon.push(partner)
                const groupName = 'New Group'
                const groupAvatar = 'https://thumb.mp-farm.com/53138483/preview.jpg'
                const numberParticipate = userInCon.length
                const messages = []
                createGroupConversation({userInCon,groupName,groupAvatar,numberParticipate,messages})
            } else {
                addParticipateToGroup(conver.idConver,addPeople)
            }
            setOpen(false)
            navState.reRenderSidebar(prev => {
                if (prev > 100 ){
                    return prev - 2
                } else return prev +2
            })
            setRerender(prev => prev + 2)
        } else {
            window.alert("Co cai gi dau ma them ")
        }
    }

    return (
        <div className={addModalClasses} onClick={()=>setOpen(false)}>
            <div className={modalBoxClasses} onClick={(ev)=>ev.stopPropagation()}>
            <div className={modalHeaderClasses}>
                    <span style={{color:color}}>{header}</span>
                    <i className="bi bi-x" onClick={()=>{setOpen(false)}}></i>
                </div>
                <div className={modalBodyClasses}>
                    {avaiableParticipater.map((participate,index)=>
                        <div key={index} className={personSelectContainerClasses} onClick={(ev)=>addPeopleHandle(ev.currentTarget,participate.userId)} >
                            <img className={avatarClasses} src={participate.avatar} alt="avatar"></img>
                            <span>{participate.firstName}</span>
                            <label style={{display:"none"}}>{participate.userId}</label>
                        </div>
                    )}
                </div>
                <div className={modalFooterClasses}>
                        <div className={buttonGroupClasses}>
                            <button className={clsx(styles.btn,styles.yes)} onClick={()=>createGroupHandle()} >Add</button>
                            <button className={buttonClasses} onClick={()=>setOpen(false)}>Cancel</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal