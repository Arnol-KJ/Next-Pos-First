import { NextRequest,NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { ResultSetHeader,FieldPacket } from "mysql2";
import { Products } from "@/type/data";

interface Params{
    params: {
        storeId : string
    }
}


export async function POST(req:NextRequest , {params}:Params) {
    const {data} = await req.json()
    const {storeId} = await params
    try{
        if(!data || !storeId){
            return NextResponse.json({error : 'No data or store_id'} , {status : 401})
        }
        const {newData}:{newData:Partial<Products>} = data
        const VALUES = [
            newData.product_name,
            newData.product_price,
            newData.product_img,
            newData.store_id
        ]
        const querySyntax = "INSERT INTO Products (product_name,product_price,product_img,store_id) VALUES(?,?,?,?)"
        const [addData , fields]:[ResultSetHeader,FieldPacket[]] = await pool.query(querySyntax,VALUES)
        
        return NextResponse.json({success : true} , {status:200})
    }catch(error:any){
        console.error("error" , {error:error.message})
        return NextResponse.json({error : error.message} , {status : 500})
    }
}