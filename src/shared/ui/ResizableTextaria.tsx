import { useRef, type FC } from "react";

type ResizableTextariaProps = {
    name: string,
    label: string,
    placeholderText?: string
}

const ResizableTextaria: FC<ResizableTextariaProps> = ({ name, label, placeholderText }) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        const elem = textareaRef.current;

        if (elem && elem.parentElement) {
            elem.style.height = "auto";
            elem.parentElement.style.height = "auto";

            const numOfLines = elem.scrollHeight / 32;
            const newHeight = Math.min(numOfLines * 32, 5 * 32)

            elem.style.height = newHeight + "px";
            elem.parentElement.style.height = (newHeight + 16 ) + "px";

            elem.parentElement.style.borderRadius =  (numOfLines === 1 ? 50 : 30) + "px";
        }
    }

    return (
        <div className="h-12 grow py-2 px-4 bg-primary-bg rounded-full gap-x-2 has-focus-visible:ring-2 has-focus-visible:ring-white">
            <label
                htmlFor={name}
                className="sr-only">
                {label}
            </label>
            <textarea
                ref={textareaRef}
                name={name}
                id={name}
                rows={1}
                onInput={handleInput}
                {...placeholderText && { placeholder: placeholderText }}
                className="text-lg h-8 leading-8 w-full resize-none text-primary-text placeholder:text-secondary-text outline-none">
            </textarea>
        </div>
    );
}

export default ResizableTextaria;