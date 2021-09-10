import "../styles/AdminChat2.css"
import { connect } from "react-redux"
import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
// import "../styles/adminChat.css";

const Admin = (props) =>{
    const {token, admin} = props
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [clients, setClients] = useState([])
    const [users, setUsers] = useState([])
    const [tabs, setTabs] = useState([])
    useEffect(()=>{
        setSocket(io('http://localhost:4000', {
            auth:{
                token: token
            }
        }))
     //eslint-disable-next-line
    },[])
    // console.log(messages)
    useEffect(()=>{
        if(!token){
            return false
        }
        if(!socket){
            return false
        }
        socket.on("userConnected", (users) =>{
            setUsers(users)
        })
        socket.on("clientNeedHelp", who =>{
            setClients(clients => [...clients, who.sender])
        })
        socket.on("newMessage", (message) =>{
            setMessages(messages => [...messages, {message: message.message, sender: message.sender}])
        })
    },[socket])
    const [newMessage, setNewMessage] = useState({
        message: '',
        sendTo: ''
    })
    const inputHandler = (e) => {
        setNewMessage({
            ...newMessage,
            [e.target.name] : e.target.value
        })
    }
    const sendMessage = () => {
        if(newMessage.message === ''){
            return false
        }
        socket.emit("newMessageTo", newMessage)
        setMessages(messages => [...messages, {message: newMessage.message, sender: 'Me'}])
        let mistabs = [...tabs]
        mistabs = mistabs.map(tab => {
            if(tab.sender === willHelp.whoToHelp){
                tab.messages.push({message: newMessage.message, sender: 'Yo'})
            }
            return tab
        })
        console.log(mistabs)
        setTabs(mistabs)
        setNewMessage({
            ...newMessage,
            message: ''
        })
    }
    const [willHelp, setWillHelp] = useState({
        whoToHelp: ''
    })
    const inputHelpHandler = (e) =>{
        setWillHelp({
            [e.target.name] : e.target.value
        })
    }
    const sendIHelp = () =>{
        if(willHelp.whoToHelp === ''){
            return false
        }
        socket.emit('iWillHelp', willHelp)
        let newClients = clients.filter(client => client !== willHelp.whoToHelp)
        setClients(newClients)
        setTabs(tabs => [...tabs, {sender: willHelp.whoToHelp, messages:[]}])
        setNewMessage({
            ...newMessage,
            sendTo: willHelp.whoToHelp
        })
    }
    const keySubmit = (e)=>{
        // console.log(e.key)
        e.key === 'Enter' && sendMessage()
    }
    const handleClient = (e) =>{
        setWillHelp({
            whoToHelp: e.target.id
        })
        setNewMessage({
            ...newMessage,
            sendTo: e.target.id
        })
    }
    const commentsEndRef = useRef(null)
    const scrollToBottom = () => {
        commentsEndRef.current.scrollTo({  
            top: commentsEndRef.current.scrollHeight,
            behavior: 'smooth' 
        })
    }
    useEffect(() =>{
        if(messages.length === 0){
            return
        }
        scrollToBottom()
        let msgs = [...messages]
        console.log(msgs)
        let newMsg = msgs.pop()
        let mistabs = [...tabs]
        mistabs = mistabs.map(tab => {
            if(tab.sender === newMsg.sender){
                tab.messages.push({message: newMsg.message, sender: 'Usuario'})
            }
            return tab
        })
        console.log(mistabs)
        setTabs(mistabs)

    },[messages])
    // pestañanas [{sender: id, messages: ["messages"]}]
    // al apretar ayudar a, pushear a ese arreglo un nuevo [{sender: xxxx, messages: ["blabla"]}]
    //al recibir nueva mensaje, chequear sender. hacer find de sender en el arreglo pestañas
    // pushearla a la propiedad messages, el string del message.message
    console.log(tabs)
    if(!token && !admin){
        return(
            <p>NO ESTAS AUTORIZADO A VER ESTO</p>
        )
    }
    return(
        <div className="supportChatContainer">
            <div className="chatBoxHandler">
                <div className="whoImHelpingContainer">
                    <h4>A quien estoy ayudando:</h4>
                    {users.find(user => user.id === willHelp.whoToHelp) && <div>
                    <p>Nombre: {users.find(user => user.id === willHelp.whoToHelp).firstName}</p>
                    <p>Email: {users.find(user => user.id === willHelp.whoToHelp).eMail}</p>
                    <p>Id: {users.find(user => user.id === willHelp.whoToHelp).id}</p>
                    </div>}
                </div>
                <h4>Chat de Soporte</h4>
                {tabs.map(tab => {
                    return(
                    <div className="chatBox" style={willHelp.whoToHelp === tab.sender ? {display:"block"} : {display:"none"}} key={tab.sender} ref={commentsEndRef}>
                        <h2>{tab.sender}</h2>
                        <div>
                            {tab.messages.map((message, index) => <p key={index}>{message.sender}: {message.message}</p>)}
                        </div>
                    </div>)
                })}
                <div className="inputToSend">
                    <input onChange={inputHandler} onKeyDown={keySubmit} type="text" name="message" value={newMessage.message}></input>
                    <button onClick={sendMessage}>ENVIAR</button>
                </div>
            </div>

            <div className="sendContainerChat">
                <div className="handleWhoToHelpContainer">
                    <label htmlFor="sendTo">Enviar mensaje a ID:</label>
                    <input onChange={inputHandler} type="text" name="sendTo" value={newMessage.sendTo} disabled></input>
                    <label htmlFor="whoToHelp">Habilitar chat a: </label>
                    <input onChange={inputHelpHandler} type="text" name="whoToHelp" value= {willHelp.whoToHelp}></input>
                    <button onClick={sendIHelp}>Habilitar</button>
                </div>
                <div className="peopleToHelpContainer">
                    <h4>Clientes que pidieron ayuda:</h4>
                    {clients.length > 0 && clients.map(client => <p className="clientsSupport" key={client} id={client} onClick={handleClient}>{client}</p>)}
                </div>
            </div>
            <div className="whoImHelpingContainer">
                <h4>Lista de Usuarios conectados:</h4>
                {users.length > 0 && users.map(user => <div key={user.id}>
                <p>Nombre: {user.firstName}</p>
                <p>Email: {user.eMail}</p>
                <p id={user.id} onClick={handleClient}>Id: {user.id}</p>
                </div>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
        token: state.user.token,
        admin: state.user.admin
    }
}
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)