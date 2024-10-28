import { Container } from '../components';
import { useState } from 'react';
import { ChatMessage, formatMessage } from '../utils/chatUtils';
import { getBotResponse } from '../services/aiService/aiService';
import ChatWindow from '../components/MessageBox/ChatWindow';
import ChatInput from '../components/MessageBox/ChatInput';

const Home = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    const HandleSendMessage = async (message: string) => {
        const userMessage: ChatMessage = formatMessage(message, 'user');
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true); // Start loading

        try {
            const botResponse = await getBotResponse(message);
            const botMessage: ChatMessage = formatMessage(botResponse, 'bot');
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = formatMessage("Sorry, I couldn't get a response from the bot.", 'bot');
            setMessages((prev) => [...prev, errorMessage]);
            console.error("Error fetching bot response:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <Container>
                <div className='flex flex-wrap'>
                    <ChatWindow messages={messages} loading={loading} /> {/* Pass loading state if needed */}
                    <ChatInput onSend={HandleSendMessage} />
                    <h1>home</h1>
                </div>
            </Container>
        </div>
    );
};

export default Home;
