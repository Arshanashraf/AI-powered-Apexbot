
export interface ChatMessage{
    role: 'user' | 'bot';
    content: string;
    timeStamp: Date
}

export function formatMessage(content: string, role: 'user' | 'bot'): ChatMessage{
    return {
        role,
        content,
        timeStamp: new Date()
    }
}

const conversationHistory: ChatMessage[] = [];

export function addMessageToHistory(message: ChatMessage):void{
    conversationHistory.push(message)
}

export function getConversationHistory(): ChatMessage[]{
    return conversationHistory
}

export function clearConversationHistory():void{
    conversationHistory.length  = 0
}

export function generateBotResponse(userMessage: string): ChatMessage{

    const response = `You said: ${userMessage}`;
    return formatMessage(response, 'bot')
}