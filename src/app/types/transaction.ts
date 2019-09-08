export interface TransactionParameter {
    from: string;
    to?: string;
    value?: number|string;
    gas?: number|string;
    gasPrice?: number|string;
    data?: string;
    nonce?: number;
}
