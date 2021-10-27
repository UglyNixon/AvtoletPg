
import {makeAutoObservable} from 'mobx'
export default class DeviceStore {

        constructor() {
            this._devices=[
            ]
            this._device =[]
            this._page= 1;
            this._limit=10;
            makeAutoObservable(this)
          
        }
        setPage (page){
            this._page=page
        }
        setLimit (limit){
            this._limit = limit
        }
        setDevices (devices) {
            this._devices=devices
        }
     
       
      
       
        setDevice(device){
            this._device=device
        }

        get device (){
            return this._device
        }

     get devices(){
        return this._devices
    }
    get page (){
        return this._page
    }
 
       get limit (){
           return this._limit
       }


}