import clsx from "clsx"
import styles from "./Mess.module.scss"
import {actionsNav,useNav} from "../../../../Global/State/Nav"
import {getAllConversationByUsername} from "../../../../Global/API"
import { useLayoutEffect, useState } from "react"
import MiniConver from "./MiniConver/MiniConver"
function Mess({infoUser}){
    //State
    const [conversation,setConversation] = useState([])
    const [highlight,setHighlight] = useState()
    const [reRenderSidebar,setReRenderSidebar] = useState(Math.floor(Math.random() * 11))
    const [navState,navDispatch] = useNav()
    //Classes
    const conversationsClasses = clsx(styles.conversations)
    const headerClasses = clsx(styles.header)
    const bodyClasses = clsx(styles.body)
    //useEffect get API
    useLayoutEffect(()=>{
        navDispatch(actionsNav.addReRenderSidebar(setReRenderSidebar))
        getAllConversationByUsername(infoUser.userId).then(data => setConversation(data))
    },[reRenderSidebar])
    //function
    function clickMiniconHandle(index){
        setHighlight(index)
    }
    return (
        <div className={conversationsClasses}>
            <div className={headerClasses}></div>
            <div className={bodyClasses}>
                {conversation.map((conver,index)=>
               { 
                return (
                    <div key={index} onClick={()=>clickMiniconHandle(index)}>
                        <MiniConver conver={conver} infoUser={infoUser} highlight={highlight} index={index}></MiniConver>
                    </div>
                )}
                )}
            </div>
        </div>
    )
}

export default Mess