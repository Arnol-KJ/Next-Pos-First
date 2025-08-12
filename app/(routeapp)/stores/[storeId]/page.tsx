import React from 'react'
// import { useState , useEffect} from 'react'
import { Products } from '@/type/data'
import Stores from '@/app/frontEnd/Stores'


interface Params{
    params:{
        storeId : string
    }
}


export default async function stores({params}:Params) {
  const {storeId} = await params
  return (
    <div>
      <Stores storeId={parseInt(storeId)} />
    </div>
  )
}
