import {$authHost,$host} from "./index"




export const createWorkerPlace =async (type) =>{
    const {data} = await $authHost.post('api/type',type)
 
    return data
}
export const fetchWorkerPlace =async (id) =>{
    const {data} = await $host.get('api/type')
     return data
}

