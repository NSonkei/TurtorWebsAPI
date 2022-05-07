import clsx from "clsx"
import styles from "./Sidebar.module.scss"
import Mess from "./Mess/Mess"
import { getAllContact } from "../../../Global/API"
import {actionsNav,useNav} from "../../../Global/State/Nav"
import { useEffect } from "react"
function Sidebar({infoUser}){
    const sidebarContainerClasses = clsx(styles.sidebarContainer)
    const [navState,navDispatch] = useNav()
    useEffect(()=>{
        getAllContact(localStorage.getItem('user')).then(data=>navDispatch(actionsNav.getContact(data)))
    },[])
    return (
        <div className={sidebarContainerClasses}>
            {navState.navSide === 'mess' ? <Mess infoUser={infoUser}></Mess>: <div>ContactSideBar</div>}
        </div>
    )
}

export default Sidebar