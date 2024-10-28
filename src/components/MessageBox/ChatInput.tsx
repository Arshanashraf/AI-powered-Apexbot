import { useState } from "react"
import {Button} from "../index"

interface ChatInputProps{
    onSend: (message: string) => void
}
const ChatInput = ({onSend}:ChatInputProps) => {
    const [message, setMessage] = useState("")

    const handleSend = () => {
        if(message.trim()){
            onSend(message)
            setMessage('')
        }
    }
  return (
    <div className="chat-input">
      <input
       type="text"
       value={message}
       onChange={(e) => setMessage(e.target.value)}
       placeholder="Type your message..." />
       <Button onClick={handleSend}>Send</Button>
    </div>
  )
}

export default ChatInput
