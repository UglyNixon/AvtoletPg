
import {makeAutoObservable} from 'mobx'
export default class RuchkaStore {

        constructor() {
            this._workers=[
               { id:1,code:47},
               { id:2,code:48},
               { id:3,code:49},
            ]
         
            makeAutoObservable(this)

        }
        setWorkers () {
            this._workers=workers
        }
       get workers (){
           return this._workers
       }



}