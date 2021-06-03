import {$authHost,$host} from './index'
export const registration = await $host.post('api/auth/registration',{login,password})