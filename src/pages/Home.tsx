import { Container } from '../components';
import { useState } from 'react';
import { ChatMessage, formatMessage } from '../utils/chatUtils';
import { getBotResponse } from '../services/aiService/aiService';
import ChatWindow from '../components/MessageBox/ChatWindow';
import ChatInput from '../components/MessageBox/ChatInput';

const Home = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendMessage = async (message: string) => {
        const userMessage: ChatMessage = formatMessage(message, 'user');
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const botResponse = await getBotResponse(message);
            const botMessage: ChatMessage = formatMessage(botResponse, 'bot');
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = formatMessage("Sorry, I couldn't get a response from the bot.", 'bot');
            setMessages((prev) => [...prev, errorMessage]);
            console.error("Error fetching bot response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Container>
                <div className="flex flex-col mx-40  overflow-y-auto h-screen  bg-white">
                    {/* Chat window takes remaining height and scrolls if necessary */}
                    <div className="flex-1 mt-20  px-4   ">
                        <ChatWindow messages={messages} loading={loading} />
                    </div>
                </div>
            </Container>
            {/* Fixed chat input box at the bottom of the viewport */}
            <div className="fixed bottom-0 w-full border-t p-4 bg-black">
                <ChatInput onSend={handleSendMessage} />
            </div>
        </div>
    );
};

export default Home;
