import {$authHost,$host} from './index'

export const registration = async(login,password)=> {
    const response = await $host.post('api/user/auth/registration',{login,password,role:'ADMIN'})
    return response
}

export const login = async(login,password)=> {
    const response = await $host.post('api/user/auth/login',{login,password})
    return response
}

export const check = async(login,password)=> {
    const response = await $host.post('api/user/auth/auth',{login,password})
    return response
}