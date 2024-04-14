export interface CustomerData {
    title: string;
    file: string;
    collab: string[];
    privacy: string;
}
export interface Customer {
    id: number;
    title: string;
    email: string;
    region: string;
    country: string;
}

export interface Pin {
    id: number;
    customerData: CustomerData
}