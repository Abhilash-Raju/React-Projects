import {ChatEngine } from 'react-chat-engine';
import './App.css';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm'

const App = () =>{
    if(!localStorage.getItem('username')) return <LoginForm />
    return (
        <ChatEngine 
            height='100vh'
            projectID='abafc6ed-15d3-4c82-a619-62f65954718d'
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps} />}
        />
    )
}

export default App;