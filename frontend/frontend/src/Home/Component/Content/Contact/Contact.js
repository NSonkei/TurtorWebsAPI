import styles from "../Content.module.scss"
import clsx from "clsx"
import {Fragment, useState, useEffect} from "react"
import CardFriend from "./CardFriend"
function Contact(){
    //Classes 
    const headerClasses = clsx(styles.headerContent)
    const bodyContactClasses = clsx(styles.bodyContact)
    const [hintFriend,setHintFriend] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:8080/api/user/getHintFriend/${localStorage.getItem('user')}`,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then(rp => rp.json())
        .then(data => setHintFriend(data))
    },[])
    return (
        <Fragment>
            <div className={headerClasses}>
                <h2 className={styles.center}>YOU MAY KNOW</h2>
            </div>
            <div className={bodyContactClasses}>
                {hintFriend.map((value,index)=>{
                    return (
                        <CardFriend key={index} userid={value}></CardFriend>
                    )
                })}
            </div>
            
        </Fragment>
    )
}

export default Contact