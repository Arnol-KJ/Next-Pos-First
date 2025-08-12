import Stock from "@/app/frontEnd/Stock";

interface Params{
    params : {
        storeId : string
    }
}

export default async function stock({params}:Params){
    const {storeId} = await params
    return(
        <Stock storesId = {storeId} />
    )
}