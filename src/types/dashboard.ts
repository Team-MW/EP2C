export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    companyName?: string;
}

export interface Document {
    id: string;
    name: string;
    type: string; // 'pdf', 'docx', etc.
    size: number;
    uploadDate: Date;
    status: 'pending' | 'validated' | 'rejected';
    url: string;
}
