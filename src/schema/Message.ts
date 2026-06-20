type Choice = {
    message: {
        role: string,
        content: string
    }
}

export type Response = {
    choices: Choice[]
};

export type Request = {
    message: Message,
    isRetrying?: boolean
}

export type Message = {
    id: number,
    userMsg: string,
    aiMsg?: string
}