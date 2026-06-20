import Chat from "./Chat";
import { useGetMessages } from "../lib/useGetMessages";
import type { Message } from "@/schema/Message";
import { useGenerate } from "../lib/useGenerate";
import { useMutationState } from "@tanstack/react-query";
import Notification from "./Notification";

const Chats = () => {

    const { data: messages } = useGetMessages();

    const status = useMutationState({
        filters: {
            mutationKey: ['prompt']
        },
        select: (mutation) => mutation.state.status
    });

    const { mutate } = useGenerate();

    const handleRetry = (message: Message) => {
        mutate({ message, isRetrying: true })
    }

    return (
        <section className="grow my-4 px-4 md:px-10 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-white">
            <div className="text-secondary-text max-w-4xl mx-auto">
                {
                    messages.length === 0 
                    &&
                    <div className="text-center mt-30">
                        <p className="text-2xl font-medium">How can I help you today?</p>
                        <p className="text-2xl font-medium">Try asking something...</p>
                    </div>
                }
                {
                    (messages.length !== 0)
                    &&
                    messages.map((message) => <Chat key={message.id} message={message} handleRetry={handleRetry} />)
                }
                {
                    status[status.length - 1] === 'pending'
                    &&
                    <p className="text-lg text-center font-medium">
                        <span className="w-4 h-4 rounded-full inline-block animate-spin border-3 border-accent border-t-transparent"></span>
                        &nbsp;&nbsp;AI is thinking...
                    </p>
                }
                {
                    status[status.length - 1] === 'error'
                    &&
                    <Notification message="Please Check Your Internet Connection." />
                }
            </div>
        </section>
    );
}

export default Chats;