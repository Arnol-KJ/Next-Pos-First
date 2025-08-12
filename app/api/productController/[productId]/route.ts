import pool from "@/lib/mysql";
import { RowDataPacket,FieldPacket,ResultSetHeader } from "mysql2";
import { NextRequest,NextResponse } from "next/server";
import { Products } from "@/type/data";

interface Params{
    params:{
        productId : string
    }
}

export async function POST(req:NextRequest,{params}:Params) {
    const {data,action} = await req.json()
    const {productId} = await params
    if(!action){
        return NextResponse.json({error : "Action Required"},{status : 400})
    }
    try{
        // const {productId} = params
        if(action == "edit"){
            const {update}:{update:Partial<Products>} = data
            const VALUES = [
                update.product_name,
                update.product_price,
                update.product_img,
                parseInt(productId,10)
            ]
            
            const query = 'UPDATE Products SET product_name = ? , product_price = ? , product_img = ? WHERE product_id = ?'
            const [updates , fields]:[ResultSetHeader,FieldPacket[]] = await pool.query(query,VALUES)
        }
        else if(action == "delete"){
            const [deleteData , fields]:[ResultSetHeader,FieldPacket[]] = await pool.query(
                'DELETE FROM Products WHERE product_id = ?',[productId]
            )
        }
        return NextResponse.json({success : true},{status : 200})
    }
    catch(error:any){
        console.error("error" , {error : error.message})
        return NextResponse.json({error : error.message},{status : 500})
    }
}
