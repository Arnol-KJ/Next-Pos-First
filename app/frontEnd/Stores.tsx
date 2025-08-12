'use client'
import { useRouter } from "next/navigation";
import { Products } from "@/type/data";
import { useEffect, useState } from "react";
// import useSWR from "swr";


interface storeData{
    storeId : number
    
}
// interface orderData{
//     orderId : string
// }
interface Item{
    product_id : number
    product_name : string
    product_price : number
    quantity : number
    store_id :number
}


export default function Stores({storeId}:storeData){
    const [datas,setDatas] = useState<Products[]>([])
    const [cart , setCart] = useState<Item[]>([])
    const router = useRouter()
    const fetchData = async () =>{
        try{
            const response = await fetch(`/api/store_manage/${storeId}`,{
            method : 'GET'
            })
            if (response.ok){
                const result = await response.json()
                setDatas(result.datas || [])
            }
            else{
                console.error(response.status)
            }
        }catch(error){
            console.error('Failed to fetch' , error)
        }
    }
    useEffect(() =>{
       fetchData() 
    },[storeId])
    const addToCart = (product : Products) =>{
        setCart(prev =>{
            const exist = prev.find(ihere => ihere.product_id === product.product_id)
            if(exist){
                return prev.map(ihere => 
                    ihere.product_id === product.product_id
                    ?{...ihere,quantity: ihere.quantity +1,store_id : storeId} : ihere
                )
            }else{
                return[
                    ...prev,
                    {
                        product_id : product.product_id,
                        product_name : product.product_name,
                        product_price : product.product_price,
                        quantity : 1,
                        store_id : storeId
                    }
                ]
            }
        })
    }
    const upDate = (id : number , delta : number) =>{
        setCart(prev => 
            prev.map(i => 
                i.product_id === id
                ?{...i , quantity:Math.max(1,i.quantity + delta)} : i
            ).filter(i => i.quantity > 0)
        )
    }
    const handlePay = async () => {
        try{
            const response = await fetch(`/api/productController/order` ,{
                method : "POST",
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({
                    item : cart,
                    total : totals,
                    store_id : storeId,
                })
            })
            if(response.ok){
                alert("Order submitted")
                // const Datas = await response.json()
                // const orderId = Datas.id
                // router.push(`/stores/${storeId}/recipt/${orderId}`)
                setCart([])
                
            }else{
                console.error('failed to submit' , response.status)
            }
        }catch(error){
            console.error("error is ",error)
        }
    }
    const clear = () =>{
        
    }
    const totals = cart.reduce((sum , ihere) => sum + ihere.product_price * ihere.quantity , 0)
    return(
        <div className="container mx-auto p-4">
            <h1>Store id is : {storeId}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-200">
                {datas.map((item) => (
                    <button key={item.product_id} className="bg-gray-200 h-32 hover:bg-gray-300 transition duration-200 flex flex-col items-center justify-center p-2" onClick={() => addToCart(item)}>
                        {item.product_img ? (
                            <img src={item.product_img} alt={item.product_name} className="w-16 h-16 object-cover mb-2" width={200} height={200}/>
                        ) : (
                            <span>Null</span>
                        )}
                        <span className="text-sm font-medium">{item.product_name}</span>
                        <span className="text-sm">$ {item.product_price}</span>
                    </button>
                ))}
            </div>
            {/* หน้าสินค้าสำหรับชำระ */}
            <div className="w-1/4 bg-gray-100 p-4 border-l border-green-300 flex flex-col">
                <h2 className="font-bold mb-2">สินค้า</h2>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {cart.map((item) => (
                        <div key={item.product_id} className="flex justify-between items-center text-sm">
                            <span>{item.product_name}</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => upDate(item.product_id , -1)}
                                    className="px-2 bg-gray-300 rounded"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                    onClick={() => upDate(item.product_id , 1)}
                                    className="px-2 bg-gray-300 rounded"
                                >
                                    +
                                </button>
                                <span>{item.product_price * item.quantity} $</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t mt-4 pt-2 text-sm">
                    <div className="flex jsutify-between">
                        <span>Total Amount</span>
                        <span>{totals}</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handlePay}
                        className="flex-1 border border-green-600 text-green-600 rounded py-1"
                    >
                        pay
                    </button>
                    <button
                        onClick={() => clear}
                        className="flex-1 border border-red-600 text-red-600 rounded py-1"
                    >
                        clear
                    </button>
                </div>
            </div>
            <nav className="mt-4 bg-gray-800 text-white p-2 text-center fixed bottom-0 left-0 w-full">
                <div className="flex justify-around items-center">
                    <ul className="flex justify-around items-center w-full">
                        {['Goods', 'Stock', 'Dashboard'].map((item) => (
                            <li key={item}>
                                <a href={`/stores/${storeId}/${item.toLowerCase()}`} className="mx-2 hover:text-gray-300 transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>          
                </div>
            </nav>
        </div>
    )
}


