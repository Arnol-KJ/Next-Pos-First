'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface paramsRecipt{
    storeId : number
    orderId : string
}
// interface ProductsItem{
//     product_id : number
//     product_name : string
//     quantity : number
//     product_price : number
//     store_id :number
// }
// interface Product_order{
//     item : ProductsItem[]
//     total : number
//     store_id : number
// }

export default function Recipt({storeId , orderId}:paramsRecipt){
    // const [recipts , setRecipt] = useState<Product_order[]>([])
    try{
        const fetchData = async () =>{
            const res = await fetch(`http://localhost:3000/api/store_manage/${storeId}/recipt/${orderId}`,{
                method : "PUT"
            })
            if(res.ok){
                const result = await res.json()
                // setRecipt(result.recipts || [])
            }
            else{
                console.error("error : " , res.status)
            }
        }

        useEffect(() => {
            fetchData()
        },[storeId,orderId])
    }catch(error:any){
        console.error("error" , {error : error.message})
    }




    return(
        <div>

        </div>
    )
}