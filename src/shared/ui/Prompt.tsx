import { useEffect, useRef, type SyntheticEvent } from "react";
import { useGenerate } from "../lib/useGenerate";
import ResizableTextaria from "./ResizableTextaria";

const Prompt = () => {

    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const { mutate, status } = useGenerate();

    useEffect(() => {
        if (submitButtonRef.current !== null) {
            if (status === "error" || status === "success") {
                submitButtonRef.current.disabled = false;
            }
            else if (status === "pending") {
                submitButtonRef.current.disabled = true;
            }
        }
    }, [status]);

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const message = formData.get("prompt")?.toString().trim() ?? "";

        if (message === "") {
            return;
        }

        mutate({
            message: {
                id: Date.now(),
                userMsg: message
            }
        });

        event.currentTarget.reset();
    }

    return (
        <section className="w-full mb-4 md:mb-12">
            <form onSubmit={handleSubmit}
                className="max-w-xl mx-auto px-4 flex gap-4">
                    <ResizableTextaria 
                    label="Enter a message"
                    name="prompt"
                    placeholderText="Type something here..."
                    />
                    
                <button aria-label="Send Message."
                        ref={submitButtonRef}
                        type="submit"
                        className="shrink-0 active:scale-80 transition-[scale] disabled:brightness-50 self-end bg-accent rounded-full size-12 flex justify-center items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white" >
                        <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-7 fill-primary-text">
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </button>
            </form>
        </section>
    );
}

export default Prompt;