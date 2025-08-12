'use client'
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { Products } from "@/type/data";

interface storesId{
    storesId : string
}
interface Action{
    action : string
}

export default function Stock({storesId}:storesId){
    const [action , setAction] = useState<Action>({action : ''})
    const [products , setProduct] = useState<Products[]>([])
    const storeId = parseInt(storesId)
    const router = useRouter()
    const fetchData = async () =>{
        const response = await fetch(`/api/store_manage/${storeId}`)

        if(response.ok){
            const result = await response.json()
            setProduct(result.datas || [])
        }
        else{
            console.log("what is error " , response.status)
        }
    }

    useEffect(() => {
        fetchData()
    },[storeId])

    return (
        <div className="container mx-auto p-4">
            <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" onClick={() => router.back()}>Return</button>
            <h1 className="flex items-center justify-center text-2xl">Store Id is {storeId}</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black-700 uppercase bg-black-50 dark:bg-red-700 dark:text-red-400">
                        <tr>
                            <th className="px-6 py-3 text-white" scope="col">Product Name</th>
                            <th className="px-6 py-3 text-white" scope="col">Product Price</th>
                            <th className="px-6 py-3 text-white" scope="col">Product Img</th>
                            <th className="px-6 py-3 text-white" scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key ={product.product_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.product_name}</th>
                                <td className="px-6 py-4">{product.product_price}</td>
                                <td className="px-6 py-4">{product.product_img ? (<img src={product.product_img} alt={product.product_name} width={200} height={200} />) : (<span>Null</span>)}</td>
                                <td className="px-6 py-4">
                                    <button type="submit" 
                                    className="w-full text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={() => router.push(`/stores/${storeId}/stock/${product.product_id}`)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}