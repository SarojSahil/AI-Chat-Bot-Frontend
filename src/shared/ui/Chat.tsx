import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/androidstudio.css"
import type { Message } from "@/schema/Message";
import { useRef, useState, type FC } from "react";

type ChatProps = {
    message: Message,
    handleRetry: (message: Message) => void,
}

const Chat: FC<ChatProps> = ({ message, handleRetry }) => {

    const [userMsgCopied, setUserMsgCopied] = useState(false);
    const [aiMsgCopied, setAiMsgCopied] = useState(false);

    const userMsgRef = useRef<HTMLParagraphElement>(null);
    const aiMsgRef = useRef<HTMLDivElement>(null);

    const handleCopyToClipboard = async (text: string, isUserMsg: boolean) => {
        await navigator.clipboard.writeText(text);
        if (isUserMsg) {
            setUserMsgCopied(true);
            setTimeout(() => setUserMsgCopied(false), 3000);
        }
        else {
            setAiMsgCopied(true);
            setTimeout(() => setAiMsgCopied(false), 3000);
        }
    }

    return (
        <>
            <div className="animate-slide-up text-lg ml-auto bg-primary-bg rounded-2xl mb-4 p-4 border border-neutral-800 text-primary-text w-fit max-w-[70%] md:max-w-[50%]">
                <p ref={userMsgRef}>{message.userMsg}</p>
                <div className="flex justify-end mt-4 gap-4">
                    <button onClick={() => handleRetry(message)} aria-label="Retry." className="active:scale-80 transition-[scale] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white">
                        <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg>
                    </button>
                    <button aria-label="Copy To Clipboard." className="active:scale-80 transition-[scale] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white" onClick={() => handleCopyToClipboard(userMsgRef.current?.textContent ?? "", true)}>
                        {
                            userMsgCopied
                                ?
                                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>
                                :
                                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>
                        }
                    </button>
                </div>
            </div>
            {
                message.aiMsg
                &&
                <div ref={aiMsgRef} className="mr-auto text-lg bg-zinc-900 rounded-2xl mb-4 p-4 border border-neutral-800 text-primary-text w-fit max-w-[70%] md:max-w-[50%]">
                    <ReactMarkdown
                        rehypePlugins={[rehypeHighlight]}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1 className="text-3xl font-bold mt-6 mb-3 text-white" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2 className="text-2xl font-semibold mt-5 mb-2 text-white" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3 className="text-xl font-semibold mt-4 mb-2 text-white" {...props} />
                            ),
                            p: ({ node, ...props }) => (
                                <p className="mb-3 text-zinc-300" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                                <strong className="text-white font-semibold" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                                <li className="ml-2" {...props} />
                            ),
                            code({ className, children, ...props }) {
                                return (
                                    <pre className="bg-black p-2 rounded-md overflow-x-auto my-3">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                );
                            },
                            table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-4">
                                    <table className="w-full border border-zinc-700 text-sm" {...props} />
                                </div>
                            ),
                            thead: ({ node, ...props }) => (
                                <thead className="bg-zinc-800 text-white" {...props} />
                            ),
                            th: ({ node, ...props }) => (
                                <th className="border border-zinc-700 px-3 py-2 text-left" {...props} />
                            ),
                            td: ({ node, ...props }) => (
                                <td className="border border-zinc-700 px-3 py-2" {...props} />
                            ),
                            a: ({ node, ...props }) => (
                                <a
                                    className="text-blue-400 underline hover:text-blue-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                />
                            ),
                            blockquote: ({ node, ...props }) => (
                                <blockquote
                                    className="border-l-4 border-zinc-600 pl-4 italic text-zinc-400 my-3"
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {message.aiMsg}
                    </ReactMarkdown>
                    <div className="flex justify-end mt-4">
                        <button aria-label="Copy To Clipboard." className="active:scale-80 transition-[scale] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white" onClick={() => handleCopyToClipboard(aiMsgRef.current?.textContent ?? "", false)}>
                            {
                                aiMsgCopied
                                    ?
                                    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                    </svg>
                                    :
                                    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 16 16">
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                    </svg>
                            }
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

export default Chat;