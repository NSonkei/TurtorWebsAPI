import clsx from "clsx"
import { useEffect } from "react"
import styles from "./Navbar.module.scss"
import {actionsNav, useNav} from "../../../Global/State/Nav"
function Navbar({infoUser}){
    //Global State
    const [navState,dispatchNav] = useNav()
    //Classes
    const fill = styles.fill;
    const navContaierClasses = clsx(styles.navContainer)
    const avatarClasses = clsx('avatar', styles.avatar)
    const navIconsClasses = clsx(styles.navIcons)
    const avatarAreaClasses = clsx(styles.avatarArea)
    const chatClasses = clsx('bi',{
        'bi-chat-dots': navState.navSide !== 'mess',
        'bi-chat-dots-fill': navState.navSide === 'mess',
        [fill] : navState.navSide === 'mess'
    })
    const personClasses = clsx('bi',{
        'bi-person': navState.navSide !== 'contact',
        'bi-person-fill': navState.navSide === 'contact',
        [fill]: navState.navSide === 'contact'
    })
    //Function
    function handleClickOnIcon(name){

        if (name === 'mess'){
            dispatchNav(actionsNav.navMess())
        } else if (name === 'contact'){
            dispatchNav(actionsNav.navCon())
        }
    }
    //useEffect
    useEffect(()=>{
    },[])
    return (
        <div className={navContaierClasses}>
            <div className={avatarAreaClasses}>
                <img className={avatarClasses} src={infoUser.avatar}></img>
            </div>
            <div className={navIconsClasses}>
                <i className={chatClasses} onClick={()=>handleClickOnIcon('mess')}></i>
                <i className={personClasses} onClick={()=>handleClickOnIcon('contact')}></i>
            </div>
        </div>
    )
}

export default Navbar