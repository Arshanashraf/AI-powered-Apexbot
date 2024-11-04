export const getBotResponse = async (message:string) => {
    console.log("Sending message:", message); // Log the message being sent
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: message }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Response error:', errorMessage);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
        }

        const data = await response.json();
        console.log("Received response:", data);
        
        // Extract the generated text
        return data[0]?.generated_text || "Sorry, I didn't get that."; // Fallback message

    } catch (error) {
        console.error('Error fetching bot response:', error);
        throw error;
    }
};
