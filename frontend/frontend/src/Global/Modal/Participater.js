import styles from "./Modal.module.scss"
import clsx from "clsx"
import { useEffect, useState } from "react"
import {useNav} from "../State/Nav"
function Participater({header,setOpen,color,contact,conver}){
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
    const avatarClasses = clsx("avatar",styles.avatar)
    //Effect
    useEffect(()=>{
        addPeople = []
        const result = contact.filter((con)=>{
            return conver.userInCon.some((value)=>value===con.userId)
        })
        setAvaiableParticipater(result)
    },[reRender])
    //function
    return (
        <div className={addModalClasses} onClick={()=>setOpen(false)}>
            <div className={modalBoxClasses} onClick={(ev)=>ev.stopPropagation()}>
            <div className={modalHeaderClasses}>
                    <span style={{color:color}}>{header}</span>
                    <i className="bi bi-x" onClick={()=>{setOpen(false)}}></i>
                </div>
                <div className={modalBodyClasses}>
                    {avaiableParticipater.map((participate,index)=>
                        <div key={index} className={personSelectContainerClasses} >
                            <img className={avatarClasses} src={participate.avatar} alt="avatar"></img>
                            <span>{participate.firstName}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Participater