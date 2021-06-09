import {$authHost,$host} from "./index"




export const createWorkerPlace =async (title) =>{
    const {data} = await $authHost.post('api/workerPlace',title)
 
    return data
}

export const fetchWorkerPlace =async () =>{
    const {data} = await $host.get('api/workerPlace')
     return data

}

export const createWorker =async (formData) =>{
    const {data} = await $authHost.post('api/worker',formData)
 
    return data
}

export const fetchWorker =async () =>{
    const {data} = await $host.get('api/worker')
     return data

}

export const fetchProducts= async()=>{
const {data} =await $host.get('api/product')
return data;

}

export const createProduct =async (formData) =>{
    const {data} = await $authHost.post('api/product',formData)
 
    return data
}
