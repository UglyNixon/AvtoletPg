
import {makeAutoObservable} from 'mobx'
export default class RuchkaStore {

        constructor() {
            this._ruchki=[
              
            ]
            this._ruchka =[]
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
        sortAll(p,ruchki) {
         
       return p? ruchki.sort((a,b)=>b.series-a.series) :ruchki.sort((a,b)=>a.series-b.series)
       }
        sortMax() {
        //    тут можно гораздо проще сортировать обект полученый, но для практики реализация именно через запросы

        }
        setRuchka(ruchka){
            this._ruchka=ruchka
        }

        get ruchka (){
            return this._ruchka
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