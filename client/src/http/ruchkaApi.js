import { $authHost } from "."


export const createRuchka =async (formData) =>{
    const {data} = await $authHost.post('api/',formData)
 
    return data
}

export const fetchRuchka =async () =>{
    const {data} = await $host.get('api/workerPlace')
     return data

}