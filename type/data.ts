import { isMainThread } from "worker_threads";

export interface Stores{
    store_id : number;
    store_name : string;
    create_at : Date;
}
export interface Users{
    user_id? : number;
    user_email : string;
    user_password : string;
    role? : string;
    create_at? : Date;
    store_id? : number;
}
export interface Products{
    product_id : number;
    product_name : string;
    product_price : number;
    product_img : string;
    created_at :Date;
    store_id : number;
}
export interface Sales{
    sale_id : number;
    sale_name : string;
    
}