export type ChatRole = | "USER" | "ASSISTANT";

export interface ChatMessage {
    role: ChatRole;
    content: string;
    createdAt: Date;
}

type ChatProps = {
    id?: string;
    userId: string;
    documentId: string;
    title?: string;
    messages?: ChatMessage[];
    createdAt?: Date;
    updatedAt?: Date;
};

export class Chat {
    public readonly id?: string;
    public readonly userId: string;
    public readonly documentId: string;
    public title: string;
    public messages: ChatMessage[];
    public readonly createdAt?: Date;
    public updatedAt?: Date;

    constructor(props: ChatProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.documentId = props.documentId;
        this.title = props.title ?? "New Chat";
        this.messages = props.messages ?? [];
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    addMessages(messages: ChatMessage[]) {
        this.messages.push(...messages);
    }

    addUserMessage(content: string): void {
        this.messages.push({
            role: "USER",
            content,
            createdAt: new Date(),
        });
    }

    addAssistantMessage(content: string): void {

        this.messages.push({
            role: "ASSISTANT",
            content,
            createdAt: new Date(),
        });
    }

    getId(): string {

        if (!this.id) {
            throw new Error("Chat ID is not set");
        }

        return this.id;
    }
}