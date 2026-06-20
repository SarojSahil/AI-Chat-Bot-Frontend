const Header = () => {
    return (
        <header className="flex gap-4 items-center px-4 md:px-8 py-2 bg-primary-bg border-b border-neutral-800">
            <div className="bg-accent rounded-full overflow-hidden">
                <img className="w-12 h-12"
                    src="logo.png"
                    alt="Logo that has Robot Face in it." />
            </div>
            <div>
                <p className="text-primary-text font-medium text-xl leading-5">AI Chat Bot</p>
                <p className="text-secondary-text leading-4">Assistant</p>
            </div>
        </header>
    );
}

export default Header;