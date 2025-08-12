import { NextRequest,NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { FieldPacket, RowDataPacket } from "mysql2";

interface Params {
    params : {
        orderId : string
    }
}

export async function PUT(req:NextRequest , {params}:Params) {
    try{
        
        const {orderId} = await params
        console.log(`Order  in Url is : ${orderId}`)
        if(orderId.length === 0){
            console.error(`error orderId is : ${orderId.length}`)
        }
        else{
            const [showRecipt , field]:[RowDataPacket[] , FieldPacket[]] = await pool.query(
                "SELECT * FROM Sales_items WHERE sale_id = ?",[orderId]
            )
            const [showTotal , fields]:[RowDataPacket[] , FieldPacket[]] = await pool.query(
                "SELECT * FROM Sales WHERE sale_id = ?",[orderId]
            )
            return NextResponse.json({items : {showRecipt} , showTotal})
        }
    }catch(error :any){
        console.error("error" , {error : error.message})
        return NextResponse.json({error : error.message} , {status : 500})
    }
}