import styles from "./Login.module.scss"
import clsx from "clsx"
import {useEffect, useState } from "react"
import {postLogin} from "../Global/API"
import { Link } from "react-router-dom"
import {useNav,actionsNav} from "../Global/State/Nav"
function Login(){
    //State
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [rep,setRep] = useState('')
    const [state,dispatch] = useNav()
    //Classes
    const classesContainer = clsx(styles.container)
    const classesInputArea = clsx(styles.inputArea)
    const classesInput = clsx(styles.input)
    const classesButtonArea = clsx(styles.buttonArea)
    useEffect(()=>{
        if (rep) {
            window.location.replace("http://localhost:3000/home")
        }
    },[rep])
    //Function
    function loginHandle(){
        postLogin(username,password).then(rp =>  {
            setRep(prev => rp)
        }).catch(err => new Error(err))
    }
    return (
        <div>
            <div className={classesContainer}>
                <h2>LOGIN</h2>
                <div className={classesInputArea}>
                    <div className={classesInput}>
                        <label>Username</label>
                        <input placeholder="Username" type="text" required onChange={ev=>{setUsername(ev.target.value)}}></input>
                    </div>
                    <div className={classesInput}>
                        <label>Password</label>
                        <input placeholder="Password" type="password" required onChange={ev=>{setPassword(ev.target.value)}}></input>
                    </div>
                    <div className={classesButtonArea}>
                        <button className="btn btnBlue" onClick={()=>loginHandle()}>Login</button>
                        <Link to="/register">Don't have account ? Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login