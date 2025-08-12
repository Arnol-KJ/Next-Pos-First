import Recipt from "@/app/frontEnd/Recipt"



interface Params{
    params:{
        storeId : string,
        orderId : string
    }
}
export default async function recipt({params} : Params) {
    const {storeId,orderId} = await params
  return (
    <div>
      <Recipt storeId={parseInt(storeId)} orderId ={orderId}/>
    </div>
  )
}
