import { useEffect, useState, type FC } from "react"
import { createPortal } from "react-dom";

const Notification: FC<{ message: string }> = ({ message }) => {

    const [isOpen, setOpen] = useState(true);

    useEffect(() => {
        setTimeout(() => setOpen(false), 5000);
    }, []);

    return createPortal(
        <div className="absolute block w-full p-4 top-0" aria-live="polite">
            {
                isOpen
                &&
                <div className="select-none animate-slide-down w-full text-lg max-w-md mx-auto bg-neutral-700 p-4 text-white rounded-md flex justify-between">
                    <p>
                        {message}
                    </p>
                    <button aria-label="Close Notification." className="cursor-pointer w-10 outline-none focus-visible:ring-2 focus-visible:ring-white" onClick={() => setOpen(false)}>
                        <span aria-hidden>✕</span>
                    </button>
                </div>
            }
        </div>,
        document.getElementById("root")!
    );
}



export default Notification;