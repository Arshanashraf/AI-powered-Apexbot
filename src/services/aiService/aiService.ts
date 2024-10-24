import axios from "axios";

const apiUrl = String(import.meta.env.VITE_AI_API_URL);
const apiKey = String(import.meta.env.VITE_AI_API_KEY);

export const getBotResponse= async (userMessage: string) : Promise<string> => {
    try {
        const response = await axios.post(
            apiUrl,
            {
                model : "gpt-4",
                messages: [{role: "user", content: userMessage}],
                stream: true
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.log("Error fetching bot response", error);
        throw error;
    }
}