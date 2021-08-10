import { $authHost,$host } from "./index"


    export const createRuchka =async (formData) =>{
    const {data} = await $authHost.post('api/ruchka',formData)
    return data
    }



    export const fetchRuchka= async()=>{
    const {data} =await $host.get('api/ruchka')
    return data;
    }


    export const filterRuchka= async(dolg,brak,status,date,workerId)=>{
        const {data} =await $host.get('api/ruchka/f',{params:{dolg,brak,status,date,workerId}})
        return data;  
    }
    export const fetchOneRuchka= async(id)=>{
        const {data} =await $host.get('api/ruchka/'+id)
        return data;  
    }

   export const editRuchka=async(formData)=>{
       const {data} = await $host.patch('api/ruchka',formData)
       return data
   }