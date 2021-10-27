import {$host } from "./index"


export const fetchDefecTypes= async(id)=>{
    const {data} =await $host.get('api/defec/'+id)
    return data;
    }
    export const fecthDefecStats = async(id)=> {
    const {data} = await $host.get('api/defec/stats/'+id)
    return data;
    }