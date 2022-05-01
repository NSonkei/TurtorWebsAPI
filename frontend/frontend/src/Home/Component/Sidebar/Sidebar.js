import clsx from "clsx"
import styles from "./Sidebar.module.scss"
import Mess from "./Mess/Mess"
import {useNav} from "../../../Global/State/Nav"
function Sidebar({infoUser}){
    const sidebarContainerClasses = clsx(styles.sidebarContainer)
    const [navState,navDispatch] = useNav()
    return (
        <div className={sidebarContainerClasses}>
            {navState.navSide === 'mess' ? <Mess infoUser={infoUser}></Mess>: <div>ContactSideBar</div>}
        </div>
    )
}

export default Sidebar