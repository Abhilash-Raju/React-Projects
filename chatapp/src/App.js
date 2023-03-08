import {ChatEngine } from 'react-chat-engine';
import './App.css';
import ChatFeed from './components/ChatFeed'

const App = () =>{
    return (
        <ChatEngine 
            height='100vh'
            projectID='abafc6ed-15d3-4c82-a619-62f65954718d'
            userName='Abhilash'
            userSecret='12345'
            renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps} />}
        />
    )
}

export default App;