import pool from "@/lib/mysql";
import jwt from "jsonwebtoken";
import { RowDataPacket,FieldPacket } from "mysql2";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";
import { Users } from "@/type/data";

export async function POST(req:NextRequest) {
    try{
        const {email,password} = await req.json()
        
        
        if(!email || !password){
            return NextResponse.json({error : "email or password Require"},{status : 400})
            
        }

        const [users, fields] : [RowDataPacket[],FieldPacket[]] = await  pool.query('SELECT * FROM Users WHERE user_email = ?' , [email])
        const user = users[0] as Users
        
        if (users.length === 0){
            console.error("error user")
            return NextResponse.json({error : "wrong Email or password"},{status : 401})
        }
        const isInVildPassword = await bcrypt.compare(password,user.user_password)
        if(!isInVildPassword){
            console.error("error pass")
            return NextResponse.json({error : "No password or invild"},{status : 401})
        }
        const token = jwt.sign({userId: user.user_id , email:user.user_email , role:user.role , storeId: user.store_id},
            process.env.JWT_SECRET || 'test_secret',{expiresIn: '1h'}
        )
        return NextResponse.json({token,user:{
            // id:user.user_id,
            // email:user.user_email,
            // role:user.role,
            store:user.store_id
        }},{status : 200})
    }
    catch(error:any){
        console.error("error",{message : error.message})
        return NextResponse.json({error : error.message},{status : 500})
    }
}