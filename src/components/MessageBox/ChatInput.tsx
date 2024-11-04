import { useState } from "react"
import {Button} from "../index"
import { KeyboardEvent } from "react"
interface ChatInputProps{
    onSend: (message: string) => void
}
const ChatInput = ({onSend}:ChatInputProps) => {
    const [message, setMessage] = useState("")
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && message.trim()) {
        onSend(message);
        setMessage("");
      }
    }

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
       onKeyPress= {handleKeyPress}
       onChange={(e) => setMessage(e.target.value)}
       placeholder="Type your message..." 
       className="px-3 py-2 rounded-s-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-96 2xs:w-60 xs:w-72" />

       <Button classname="rounded-s-none py-2.5" onClick={handleSend}><i className="fa-solid fa-paper-plane"></i></Button>
    </div>
  )
}

export default ChatInput
