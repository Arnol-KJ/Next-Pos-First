import { NextResponse,NextRequest } from "next/server";
import { Sales } from "@/type/data";
import pool from "@/lib/mysql";
import { RowDataPacket,ResultSetHeader,FieldPacket } from "mysql2";

interface ProductsItem{
    product_id : number
    product_name : string
    quantity : number
    product_price : number
    store_id :number
}
interface Product_order{
    item : ProductsItem[]
    total : number
    store_id : number
}

export async function POST(req:NextRequest) {
    const body:Product_order = await req.json()
    const parsedTotal = Number(body.total)
    const parsedStoreId = Number(body.store_id)
    const orderId = `ORDER-${Date.now()}`
    try{
        const [orderInsert , fields]:[ResultSetHeader,FieldPacket[]] = await pool.query(
            "INSERT INTO Sales (sale_id  , total_amount , store_id ) VALUES(?,?,?)"
            ,[orderId,parsedTotal,parsedStoreId]
        )
        for(const items of body.item){
            const parsedPrice = Number(items.product_price)
            const parsedQTY = Number(items.quantity)
            const [orderItem_Insert , field]:[ResultSetHeader,FieldPacket[]] = await pool.query(
                "INSERT INTO Sales_items (sale_id , sale_item_id , quantity , unit_price , total_price , store_id , sale_goods) VALUES(?,?,?,?,?,?,?)"
                ,[
                    orderId,
                    items.product_id,
                    parsedQTY,
                    parsedPrice,
                    parsedPrice * parsedQTY,
                    parsedStoreId , 
                    items.product_name
                ]
            )
        }
        const [showItem , field]:[RowDataPacket[],FieldPacket[]] = await pool.query(
            "SELECT * FROM Sales_items WHERE sale_id = ?",[orderId]
        )
        console.log(JSON.stringify({id : orderId,inserted : showItem}))
        return NextResponse.json({id : orderId,inserted : showItem}) 
        
    }catch(error:any){
        console.error({error : error.message})
        return NextResponse.json({error : error.message},{status : 500})
    }
}


