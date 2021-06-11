import { $authHost,$host } from "."


export const createRuchka =async (formData) =>{
    const {data} = await $authHost.post('api/ruchka',formData)
    return data
}

export const fetchRuchka= async()=>{
    const {data} =await $host.get('api/ruchka')
    return data;
    
    }
    export const filterRuchka= async(formData)=>{
        const {data} =await $host.get('api/ruchka/f',formData)
        return data;
        
        }