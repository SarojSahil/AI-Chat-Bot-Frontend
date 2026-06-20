import type { Message, Request, Response } from "@/schema/Message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGenerate = () => {

    const queryClient = useQueryClient();

    return useMutation<Response, Error, Request, Message>({
        mutationKey: ['prompt'],
        retry: false,
        mutationFn: async (data) => {

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`
                },
                body: JSON.stringify({
                    "messages": [
                        {
                            role: "system",
                            content: "You are an AI assistant that always responds in proper makrdown that can be easily convented into HTML at frontend. Make use of paragraphs, headings, sub-headings, lists, tables, code etc as per markdown standard."
                        },
                        {
                            role: "user",
                            content: data.message.userMsg
                        }
                    ],
                    "model": "llama-3.3-70b-versatile",
                    "temperature": 0.7,
                    "max_completion_tokens": 1024,
                    "top_p": 1,
                    "stream": false,
                    "stop": null
                })
            });

            if (!response.ok) {
                throw new Error("Failed to get response.");
            }

            return await response.json();
        },
        onMutate: (variables) => {

            if (!variables.isRetrying) {
                queryClient.setQueryData<Message[]>(['chats'], (oldData) => {
                    if (oldData) {
                        return [...oldData, variables.message];
                    }
                });
            }
            return variables.message;
        },
        onSuccess: (data, _, context) => {
            const newMessage: Message = {
                id: context.id,
                userMsg: context.userMsg,
                aiMsg: data.choices[0].message.content
            }

            const messages = queryClient.getQueryData<Message[]>(["chats"]);

            if (messages) {
                const index = messages.findIndex((val) => val.id === context.id);
                const newMessages = [...messages];
                newMessages.splice(index, 1, newMessage);
                queryClient.setQueryData<Message[]>(["chats"], () => newMessages);
            }
        }
    });
}