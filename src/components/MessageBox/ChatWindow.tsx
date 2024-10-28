import { ChatMessage } from "../../utils/chatUtils";
import BotResponse from "./BotResponse";
import UserMessage from "./UserMessage";

interface ChatWindowProps {
    messages: ChatMessage[];
    loading?: boolean; // Add this line to accept loading state
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
    console.log("Messages in ChatWindow:", messages); // Log the messages to see what's being passed

    return (
        <div>
            {messages.length === 0 ? (
                <p>No messages yet.</p> // Show a message if there are no messages
            ) : (
                messages.map((msg, index) => {
                    if (msg.role === 'user') {
                        return <UserMessage key={index} message={msg.content} />;
                    } else {
                        return <BotResponse key={index} message={msg.content} />;
                    }
                })
            )}
        </div>
    );
};


export default ChatWindow;
