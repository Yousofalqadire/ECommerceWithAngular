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
    sizes:Array<Size>;
    pupulerItems:boolean;
}


