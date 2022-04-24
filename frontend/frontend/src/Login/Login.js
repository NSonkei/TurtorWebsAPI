import styles from "./Login.module.scss"
import clsx from "clsx"
import {useState } from "react"
import {postLogin,getUser} from "../Global/API"
function Login({setIsLogging}){
    //State
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [token,setToken] = useState({})
    const [data,setData] = useState({})
    //Classes
    const classesContainer = clsx(styles.container)
    const classesInputArea = clsx(styles.inputArea)
    const classesInput = clsx(styles.input)
    const classesButtonArea = clsx(styles.buttonArea)
    //Function
    function loginHandle(){
        postLogin(setToken,username,password)
        if (token.accessToken) {
            localStorage.setItem('token',token.accessToken)
            setIsLogging(true)
        }
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
                        <a href="/register">Don't have account ? Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login