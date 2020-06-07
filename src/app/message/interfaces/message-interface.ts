const enn = {
    sender: 'sender'
};
export interface MessageInterface {
    id?: number;
    parent: number | null;
    subject: string | null;
    body: string;
    isRead: boolean;
    sender?: number;
    recipient?: number;
}
