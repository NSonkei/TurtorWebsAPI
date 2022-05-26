import clsx from "clsx"
import styles from "./Modal.module.scss"
import {changeGroupName} from "../API"
import { useState } from "react"
function GroupName({header,content,color,setOpen,conver}){
    //State
    const [name,setName] = useState('')
    //function
    function changeName(){
        console.log(conver.idConver)
        if (name.trim()!='') {
            changeGroupName(conver.idConver,name)
            window.location.reload()
        }
        setOpen(false)
    }
    //Classes
    const modalClasses = clsx(styles.modalChangeGroupName)
    const modalBoxClasses = clsx(styles.modalBox)
    const modalHeaderClasses = clsx(styles.modalHeader)
    const modalBodyClasses = clsx(styles.modalBody)
    const buttonGroupClasses = clsx(styles.buttonGroup)
    return (
        <div className={modalClasses} onClick={()=>{setOpen(false)}}>
            <div className={modalBoxClasses} onClick={(ev)=>{ev.stopPropagation()}}>
                <div className={modalHeaderClasses}>
                    <span style={{color:color}}>{header}</span>
                    <i className="bi bi-x" onClick={()=>{setOpen(false)}}></i>
                </div>
                <div className={modalBodyClasses}>
                    <span>{content}</span>
                    <input type="text" onChange={ev=>setName(ev.target.value)}></input>
                    <div className={buttonGroupClasses}>
                        <button className={clsx(styles.btn,styles.yes)} onClick={()=>{changeName()}} >Yes</button>
                        <button className={styles.btn} onClick={()=>{setOpen(false)}}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupName