
import {User} from '../_models/user'
export interface ShoppingCart{
    id?:number;
    productId:number;
    productName:string;
    productPric:number;
    selectedSize: string;   
    quantity:number;
    productPhoto:string;
    totalPrice:number;
    user:User;
}