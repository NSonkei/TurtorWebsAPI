import clsx from "clsx"
import styles from "./Modal.module.scss"
import {Confirm} from "./Confirm"
function RightClickMenu({x,y,setOpen,setOpenConfirm, createConversation}){
    //function
    //Classes
    const modalMenuClasses = clsx(styles.modalMenu)
    const menuContainerClasses = clsx(styles.menuContainer)
    const itemClasses = clsx(styles.item)
    return (
        <div className={modalMenuClasses} 
            onClick={()=>{setOpen(false)}} 
            onContextMenu={(ev)=>{setOpen(false); ev.preventDefault()}}
            >
            <div className={menuContainerClasses} style={{left:x,top:y+16}}>
                <div className={itemClasses} onClick={createConversation}>
                    <p>Chat</p>
                </div>
                <div className={itemClasses}>
                    <p className={styles.delete} onClick={()=>{setOpenConfirm(true)}}>Delete Friend</p>
                </div>
            </div>
        </div>
        
    )
}

export default RightClickMenu