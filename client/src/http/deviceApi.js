import { $authHost,$host } from "./index"


    export const createDevice =async (formData) =>{
    const {data} = await $authHost.post('api/device',formData)
    return data
    }



    export const fetchDevices= async(limit=10,page=2)=>{
    const {data} =await $host.get('api/device',
    {params:{limit:limit,page:page}}
    )
    return data;
    }


  
    export const fetchOneDevice= async(id)=>{
        const {data} =await $host.get('api/device/'+id)
        return data;  
    }

   