interface RequestOptions{
    method: string;
    headers: Record<string, string >;
    body ?: string;
}

export async function apiRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT'| 'DELETE',
    data ?: any
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-type' : 'application/json'
    };

    const options: RequestOptions = {
        method,
        headers,
        body: data ? JSON.stringify(data): undefined,
    };

    try {
        const response =  await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error ! status: ${response.status}`);
        }
        return await response.json() as Promise<T>
    } catch (error) {
        console.error(`Error with ${method} request to ${url}`,  error);
        throw error
    }
}

export function sendChatMessage<T>(url: string,message: string): Promise<T>{
    return apiRequest<T>(url, 'POST', {message})
}

export function getRequest<T>(url: string,): Promise<T>{
    return apiRequest<T>(url, 'GET')
}

export function postRequest<T>(url: string, data: any): Promise<T>{
    return apiRequest<T>(url, 'POST', data)
}