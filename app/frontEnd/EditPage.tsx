'use client';
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { Products } from "@/type/data";

interface storesId {
    storeId : string
    productId : string
}


export default function EditPage({storeId,productId}:storesId){
    const [action , setAction] = useState<string>('')
    const [name , setName] = useState<string>('')
    const [price , setPrice] = useState<number>()
    const [base64 , setBase64] = useState<string>('')
    const [img , setImg] = useState<File | null>(null)
    // const router = useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(!img){
            alert("No such file")
            return
        }
        const base64 = await toBase64(img as File)
        setBase64(base64 as string)
        const body = {action : "edit",
            name,
            price,
            img: base64
        }
        const res = await fetch(`/api/stores/${storeId}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

    }
    const toBase64 = (file:File) :Promise<string>=>{
        return new Promise((resolve,rejects) =>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () =>{
                resolve(fileReader.result as string)
            }
            fileReader.onerror = (error) => rejects(error)
        })
    }

    return(
        <div>
            
        </div>
    )
}