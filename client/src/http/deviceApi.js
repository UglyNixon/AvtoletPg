import { $authHost,$host } from "./index"


    export const createDevice =async (formData) =>{
    const {data} = await $authHost.post('api/chip',formData)
    return data
    }



    export const fetchDevices= async(limit=10,page=1)=>{
    const {data} =await $host.get('api/device',
    {params:{_limit:limit,_page:page}}
    )
    return data;
    }


  
    export const fetchOneDevice= async(id)=>{
        const {data} =await $host.get('api/chip/'+id)
        return data;  
    }

   