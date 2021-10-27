
import {makeAutoObservable} from 'mobx'

export default class RuchkaStore {

        constructor() {
            this._ruchki=[]
            this._allCount=0
            this._defecCount=0
            this._ruchka =[]
            this._dates=[]
            this._workers=[]
            this._defecTypes =[]
            this._defecStats=[]
            makeAutoObservable(this)
        }
        
        setRuchki (ruchki) {
            this._ruchki=ruchki
            this._allCount=ruchki.reduce((prev,ruchka)=>prev+ruchka.totalValue,0)
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
        setDefecTypes(defec) {
            this._defecTypes =defec
        }
        setDefecStats(data) {
            this._defecStats =data
            this._defecCount = data.reduce((sum,prev)=>sum+prev.value,0)
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
     get defecTypes(){
         return this._defecTypes
     }
     get defecStats(){
         return this._defecStats
     }
     get allCount(){
         return this._allCount
     }
      get defecCount(){
          return this._defecCount
      }
       

}