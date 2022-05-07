import clsx from "clsx"
import styles from "./Modal.module.scss"
function Confirm({header,content,color,setOpen,action}){
    //function
    //Classes
    const modalClasses = clsx(styles.modalConfirm)
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
                    <div className={buttonGroupClasses}>
                        <button className={clsx(styles.btn,styles.yes)} onClick={()=>action()}>Yes</button>
                        <button className={styles.btn} onClick={()=>{setOpen(false)}}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm