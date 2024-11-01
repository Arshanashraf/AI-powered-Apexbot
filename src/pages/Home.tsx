import { useEffect, useState } from 'react';
import { Container } from '../components';
import { ChatMessage, formatMessage } from '../utils/chatUtils';
import { getBotResponse } from '../services/aiService/aiService';
import ChatWindow from '../components/MessageBox/ChatWindow';
import ChatInput from '../components/MessageBox/ChatInput';
import authService from '../services/appwrite/auth';

const Home = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = await authService.getCurrentUser();
            console.log("Current User:", currentUser); // Debugging line
            if (currentUser) {
                setUser(currentUser); // Set user if found
            } else {
                setUser(null); // Set user to null if no user found
            }
        };
        
        // Invoke the function to check the user
        checkUser(); 
    }, []);
    
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

    if (!user) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-64 animate-pulse  w-full">
                            <h1 className="text-2xl  font-bold  text-white">
                                Login or Signup to Start Chatting
                            </h1>
                            {/* Add login/signup buttons here */}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // If user is logged in, show the chat
    return (
        <div className="flex flex-col h-screen">
            <Container>
                <div className="flex flex-col mx-40 overflow-y-auto h-screen bg-white">
                    <div className="flex-1 mt-20 px-4">
                        <ChatWindow messages={messages} loading={loading} />
                    </div>
                </div>
            </Container>
            <div className="fixed bottom-0 w-full border-t p-4 bg-black">
                <ChatInput onSend={handleSendMessage} />
            </div>
        </div>
    );
};

export default Home;
