import { NextRequest,NextResponse } from "next/server";
import { RowDataPacket,FieldPacket } from "mysql2";
import pool from "@/lib/mysql";


interface RequestParams{
    params:{
        storeId : string
    }
}

export async function GET(req:NextRequest,{params}:RequestParams) {
    try{
        const {storeId} = await params
        const [datas , fields]:[RowDataPacket[],FieldPacket[]] = await pool.query(
            'SELECT * FROM Products WHERE store_id = ?',[parseInt(storeId,10)]
        )
        if (datas.length === 0){
            return NextResponse.json({error : "No Products yet"},{status : 401})
        }
        return NextResponse.json({datas},{status : 200})
    }
    catch(error:any){
        console.error("error",{error:error.message})
        return NextResponse.json({error : error.message},{status : 500})
    }
    
}