import { NextResponse,NextRequest } from "next/server";
import pool from "@/lib/mysql";
import { RowDataPacket,ResultSetHeader,FieldPacket } from "mysql2";



export async function POST(req:NextRequest) {
    const {store_name} = await req.json()

    try{
        if(!store_name){
            return NextResponse.json({error : "No store Name "} , {status : 500})
        }
        const [doesExistStore , fields]:[RowDataPacket[] , FieldPacket[]] = await pool.query(
            `SELECT store_id FROM Stores WHERE store_name = ?`,[store_name]
        )
        if (doesExistStore.length > 0){
            return NextResponse.json({error : "This name Already exist"},{status : 201})
        }
        else {
            const [insertStore , filed]:[ResultSetHeader,FieldPacket[]] = await pool.query(
                `INSERT INTO Stores (store_name) VALUES(?)` ,[store_name]
            )
            return NextResponse.json({id : insertStore.insertId} , {status : 200})
        }
    }catch(error : any){
        console.error("error : " , {error : error.message})
        return NextResponse.json({error : error.message} , {status : 500})
    }
}