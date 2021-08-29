import {Photo} from "../Models/photo"
import {Size} from "../Models/size"
export interface Product
{
    id:       number;
    name:     string;
    category: string;
    brand:    string;
    price:    number;
    details:  string;
    photo:    Photo;
    sizes:Array<Size>
}

export interface IProduct
{
    Name: string;
    Category:string;
    Brand:string;
    Details:string;
    Price:number;
    Image:any;
    Sizes:string[];

}
