import styles from "./Modal.module.scss"
import clsx from "clsx"
import { useState } from "react"
function SearchFriend({header,color,setOpen}){
    const modalClasses = clsx(styles.modalConfirm)
    const modalBoxClasses = clsx(styles.modalBox)
    const modalHeaderClasses = clsx(styles.modalHeader)
    const modalBodyClasses = clsx(styles.modalBody)
    const inputBoxClasses = clsx(styles.inputBox)
    const resultSearchClasses = clsx(styles.resultSearch)
    //State
    const [searchContent, setSearchContent] = useState('')
    const [resultSearch, setResultSearch] = useState({})
    const [searchOk, setSearchOk] = useState("Fill the input and click button to search")
    const [buttonSentRequest, setButtonSentRequest] = useState({style:styles.btnSend, content:"Send request"}) 
    //function
    function searchHandle(){
        fetch(`http://localhost:8080/api/user/${searchContent}`,
        {
            method:'GET',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(rp=>rp.json())
        .then(data=>{
            console.log(data)
            if (data.firstName) {
                if (data.beFriend.some((value)=>value === localStorage.getItem('user')))
                {setSearchOk("This guy was your friend!") }
                else
                setSearchOk("Found") 
            }
            else {
                setSearchOk("Can't found this person, please try again!") 
            }
            if (data.requestFriend.some((value) => value === localStorage.getItem('user'))) {
                setButtonSentRequest({
                    style:styles.btnSended,
                    content:"Sended request"
                })
            }
            setResultSearch(data)
        })
        .catch(err => new Error("Loi Get User"))
    }
    function sendRequestHandle(){
        if (buttonSentRequest.content==="Send request"){
            const requester = {requester:localStorage.getItem('user')}
            fetch(`http://localhost:8080/api/user/addFriendRequest/${searchContent}`,
            {
                method:'PATCH',
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'application/json'
            },
                body:JSON.stringify(requester)
            }).catch((err) => new Error(err))

            setButtonSentRequest({
                style:styles.btnSended,
                content:"Sended request"
            })
        }
    }
    return (
        <div className={modalClasses} onClick={()=>{setOpen(false)}}>
            <div className={modalBoxClasses} onClick={(ev)=>{ev.stopPropagation()}}>
                <div className={modalHeaderClasses}>
                    <span style={{color:color}}>{header}</span>
                    <i className="bi bi-x" onClick={()=>{setOpen(false)}}></i>
                </div>
                <div className={modalBodyClasses}>
                        <div className={inputBoxClasses}>
                            <input autoComplete="off" onChange={(ev)=>setSearchContent(ev.target.value)}></input>
                            <button onClick={searchHandle}>Search</button>
                        </div>
                        {
                            searchOk==="Found" ?
                            <div className={resultSearchClasses}>
                                <img src={resultSearch.avatar}></img>
                                <h2>{resultSearch.firstName}</h2>
                                <button className={buttonSentRequest.style} onClick={sendRequestHandle}>{buttonSentRequest.content}</button>
                            </div> :
                                <p className={styles.contentSearch}>{searchOk}</p>
                        }
                        
                </div>
            </div>
        </div>
    )
}

export default SearchFriend