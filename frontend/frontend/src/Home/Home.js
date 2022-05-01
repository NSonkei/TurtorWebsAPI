import {useNav,actionsNav} from "../Global/State/Nav"
import {useEffect, useState} from 'react'
import {getInfoUser} from '../Global/API'
import Navbar from "./Component/Navbar"
import Sidebar from "./Component/Sidebar"
import Content from "./Component/Content"
import clsx from "clsx"
import styles from "./Home.module.scss"
function Home(){
    //Use hook nav
    const [stateNav,dispatch] = useNav()
    const [infoUser,setInfoUser] = useState({})
    //useEffect
    useEffect(()=>{
        dispatch(actionsNav.login({
            username:localStorage.getItem('user'),
            token:localStorage.getItem('token')
        }))
        getInfoUser(localStorage.getItem('user')).then(data=>setInfoUser(data))
    },[])
    //Classes
    const homeClasses = clsx(styles.homeContainer)
    return (
        <div className={homeClasses}>
            <Navbar infoUser={infoUser}></Navbar>
            <Sidebar infoUser={infoUser}></Sidebar>
            <Content></Content>
        </div>
    )
}

export default Home