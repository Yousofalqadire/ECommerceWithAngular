import {Product} from '../Models/product'
import { IUser } from './user';

export interface CartItem
{
    id?:number;
    ProductId:number;
    ProductName:string;
    ProductPric:number;
    SelectedSize: string;   
    Quantity:number;
    ProductPhoto:string;
    User:IUser;
    
}