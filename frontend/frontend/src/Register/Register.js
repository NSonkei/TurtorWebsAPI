import clsx from "clsx"
import { useState } from "react"
import styles from "./Register.module.scss"
import {addUser} from "../Global/API"
function Register(){
    //useState
    const [info,setInfo] = useState({})
    //Classes
    const classesRegisterBox = clsx(styles.registerBox)
    const classesRegisterBoxHeader = clsx(styles.registerBoxHeader)
    const classesInputArea = clsx(styles.inputArea)
    const classesInput = clsx(styles.input)
    const classesButtonArea = clsx(styles.buttonArea)
    const classesPreviewAvatar = clsx('avatar',styles.avatar)
    //Function
    function check(){
        const alertFun = (str) =>{
            console.log(info)
            window.alert(str)
            return false
        }
        if (!info.firstName) return alertFun("First Name haven't to null")
        else if (!info.lastName) return alertFun("Last Name haven't to null")
        else if (!info.phone) return alertFun("Phone haven't to null")
        else if (!info.email) return alertFun("Email haven't to null")
        else if (!info.password) return alertFun("Password haven't to null")
        else if (!info.confirmPassword) return alertFun("Confirm Password haven't to null")

        if (info.password !== info.confirmPassword) return alertFun("Password and Confirm Password not equal")

        return true
    }
    function registerHandle(){
        if (check()){
            const api = new FormData
            api.append('file',info.fileAvatar)
            api.append('upload_preset','sjhbyhxr')
            fetch("https://api.cloudinary.com/v1_1/dl13qibav/image/upload",{
                method:"POST",
                body:api
            }).then(rp => rp.json())
            .then(data => {
                addUser({...info,avatar:data.url})
                window.alert("Register succesful!")
                window.location.reload()
            })
            
        }
    }

    function handlePreviewAvatar(e){
        const file = e.target.files[0]
        setInfo(prev => {
            prev.avatar && URL.revokeObjectURL(prev)
            return ({
                ...prev,
                avatar: URL.createObjectURL(file),
                fileAvatar:file})
                
        })
    }
    return (
        <div className={classesRegisterBox}>
            <div className={classesRegisterBoxHeader}>
                <h2>Register</h2>
            </div>
            <div className={classesInputArea}>
                    <div className={classesInput}>
                        <label>First Name</label>
                        <input name="firstName" 
                        placeholder="First Name" 
                        type="text"
                        required
                        onChange={ev=>setInfo(prev => ({
                            ...prev,
                            firstName:ev.target.value
                        }))}
                        ></input>
                    </div>
                    <div className={classesInput}>
                        <label>Last Name</label>
                        <input name="lastName" 
                        placeholder="Last Name" 
                        type="text" 
                        required
                        onChange={ev=>setInfo(prev => ({
                            ...prev,
                            lastName:ev.target.value
                        }))}></input>
                    </div>
                    <div className={classesInput}>
                        <label>Phone</label>
                        <input name="phone" 
                        placeholder="Phone" 
                        type="text" 
                        required
                        onChange={ev=>setInfo(prev => ({
                            ...prev,
                            phone:ev.target.value
                        }))}></input>
                    </div>
                    <div className={classesInput}>
                        <label>Email</label>
                        <input name="Email" 
                        placeholder="Email" 
                        type="text" 
                        required
                        onChange={ev=>setInfo(prev => ({
                            ...prev,
                            email:ev.target.value
                        }))}></input>
                    </div>
                    <div className={classesInput}>
                        <label>Password</label>
                        <input name="password" 
                        placeholder="Password" 
                        type="password" 
                        required
                        onChange={ev=>setInfo(prev => ({
                            ...prev,
                            password:ev.target.value
                        }))}></input>
                    </div>
                    <div className={classesInput}>
                        <label>Confirm Password</label>
                        <input name="confirmPassword" 
                        placeholder="Confirm Password" 
                        type="password" 
                        required
                        onChange={ev=>setInfo(prev => ({
                            ...prev,
                            confirmPassword:ev.target.value
                        }))}></input>
                    </div>
                    <div className={classesInput}>
                        <label>Choose a profile picture:</label>
                        <input type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handlePreviewAvatar}>
                            </input>
                            {info.avatar && <img className={classesPreviewAvatar} src={info.avatar} alt="avatar"></img>}
                    </div>
                    <div className={classesButtonArea}>
                        <button name="buttonRegister" className="btn btnBlue" onClick={()=>registerHandle()}>Register</button>
                    </div>
            </div>
        </div>
    )
}

export default Register