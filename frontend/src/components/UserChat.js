import { connect } from "react-redux"
import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import "../styles/userChat.css";
const UserChat = (props) =>{
    const {token} = props
    const [socket, setSocket] = useState(null)
    const [adminsOnline, setAdminsOnline] = useState(0)
    useEffect(()=>{
        if(!token){
            return false
        }
        setSocket(io('http://localhost:4000', {
            auth:{
                token: token
            }
        }))
     //eslint-disable-next-line
    },[token])
    const [gotHelp, setGotHelp] = useState(false)
    const [whoIsHelpingMe, setWhoIsHelpingMe] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(()=>{
        if(!token){
            return false
        }
        if(!socket){
            return false
        }
        socket.on('adminConnected', (admins) =>{
            setAdminsOnline(admins)
        })
        socket.on("iWillHelpYou", (adminInfo) =>{
            // console.log(adminInfo)
            setWhoIsHelpingMe(adminInfo.sender)
            setGotHelp(true)
        })
        socket.on("newMessage", (message) =>{
            // console.log(message)
            // console.log("Cuando me llega el mensaje del admin", messages)
            setMessages(messages => [...messages, message])
            // console.log("Despues de pushearlo", messages)
        })
    },[socket])
    const [newMessage, setNewMessage] = useState("")
    const inputHandler = (e) => {
        setNewMessage(e.target.value)
    }
    const sendMessage = () => {
        if(newMessage === ''){
            return false
        }
        socket.emit('newMessageTo', {message: newMessage, sendTo: whoIsHelpingMe})
        // console.log("Antes de pushearlo", messages)
        setMessages(messages => [...messages, {message: newMessage, sender: 'Me'}])
        // console.log("Despues de pushearlo", messages)
        setNewMessage('')
    }
    const [helpRequested, setHelpRequested] = useState(false)
    const requestHelp = () => {
        socket.emit('clientNeedHelp')
        setHelpRequested(true)
    }
    const keySubmit = (e)=>{
        // console.log(e.key)
        e.key === 'Enter' && sendMessage()
    }
    const [chatSwap, setChatSwap] = useState(false)
    const chatHandler = () =>{
        setChatSwap(!chatSwap)
    }
    const commentsEndRef = useRef(null)
    const scrollToBottom = () => {
        commentsEndRef.current.scrollTo({  
            top: commentsEndRef.current.scrollHeight,
            behavior: 'smooth' 
        })
    }
    useEffect(() =>{
        if(!(helpRequested && gotHelp)){
            return false
        }
        if(!chatSwap){
            return false
        }
        scrollToBottom()
    },[messages, chatSwap])
    if(!token){
        return(
            <div className="haveToBeLogged">
                <h2>DEBES ESTAR LOGEADO PARA UTILIZAR EL CHAT</h2>
            </div>
        )
    }
    return(
        <div id="chatBoxHandler">
            {!chatSwap && <button id="openSupportBtn" onClick={chatHandler}>💬</button>}
            {chatSwap && <div id="chatBoxContainer">
                <button id="closeSupportBtn" onClick={chatHandler}>❌</button>
                <h4>Chat de Soporte</h4>
                <p id="onlineOperators">Numero de operadores online: {adminsOnline}</p>
                {(!helpRequested && adminsOnline > 0) && <button id="requestHelpBtn" onClick={requestHelp} type="button">CHATEAR</button>}
                {adminsOnline === 0 && <p id="noOperatorsOnline">En estos momentos no hay operadores, Por favor contactanos a: mardelcasas@gmail.com</p>}
                {(helpRequested && !gotHelp) && <p id="helpRequested">Ayuda solicitada! por favor espere...</p>}
                {(helpRequested && gotHelp) && <>
                    <div id="chatBox" ref={commentsEndRef}>
                        {messages.map((message, index) => <p key={index} className={message.sender === "Me" ? 'myMsg' : 'hisMsg'}>{message.sender === "Me" ? 'Yo: ' : 'Soporte: '}{message.message}</p>)}
                    </div>
                    <div id="msgInputs">
                        <input id="msgInput" onChange={inputHandler} onKeyDown={keySubmit} type="text" value={newMessage}></input>
                        <button id="sendBtn" onClick={sendMessage}>✉️</button>
                    </div>
                    </>
                }
            </div>}
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        token: state.user.token,
        admin: state.user.admin
    }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(UserChat)