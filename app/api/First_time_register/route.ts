import { NextRequest,NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { RowDataPacket , FieldPacket } from "mysql2/promise";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
    const {email,password,store_id} = await req.json()
    console.log("resive data is : " , {email,password,store_id})

    try{
        if(!email || !password){
            return NextResponse.json({error : "No email or Password"},{status : 400})
        }
        const [doesExitUser , fields]:[RowDataPacket[],FieldPacket[]] = await pool.query(
            "SELECT * FROM Users WHERE user_email = ?",[email]
        )
        if (doesExitUser.length > 0){
            return NextResponse.json({error : "Email already Exit"},{status : 401})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const [result , insertFields]:[RowDataPacket[],FieldPacket[]] = await pool.query(
            "INSERT INTO Users (user_email,user_password,store_id) VALUES(?,?,?)",[email,hashedPassword,store_id])//อันนี้ไปทำเพิ่มคือหน้า ui ต้องส่ง store_id เป็น1ไว้
        return NextResponse.json({success : "Register Success"},{status : 200})
    }catch(error : any){
        console.error("error",{message : error.message})
        return NextResponse.json({error : error.message},{status : 500})
    }
}