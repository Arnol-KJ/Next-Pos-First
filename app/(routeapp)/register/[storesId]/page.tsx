import Register from "@/app/frontEnd/Register";

interface Params {
    params : {
        storesId : string
    }
}

export default async function register({params}:Params){
    const {storesId} =  await params
    
    return(
        
        <Register storesId = {storesId}/>
    )
}