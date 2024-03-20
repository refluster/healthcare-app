export type Journal = {
    id: string;
    userId: string;
    author: 'user' | 'system';
    title?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
