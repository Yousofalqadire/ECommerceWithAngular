export interface BillDetail {
    id: number;
    billId: number;
    productId: number;
    productName: string;
    selectedSize: string;
    productPrice: number;
    quantity: number;
    totalPrice: number;
}