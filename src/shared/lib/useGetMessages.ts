import type { Message } from "@/schema/Message";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = () => useQuery<Message[]>({
    queryKey: ['chats'],
    queryFn: () => [],
    initialData: []
});
