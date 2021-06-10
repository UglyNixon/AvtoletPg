
import {makeAutoObservable} from 'mobx'
export default class RuchkaStore {

        constructor() {
            this._ruchki=[
              
            ]
            this._dates=[]
            makeAutoObservable(this)
            this._workers=[]
        }
        
        setRuchki (ruchki) {
            this._ruchki=ruchki
        }
        setDates (dates) {
            this._dates=dates
        }
        setWorkers (workers) {
            this._workers=workers
        }
       
       get ruchki (){
        return this._ruchki
    }
     get dates (){
         return this._dates
     }
     get workers (){
         return this._workers
     }
       

}