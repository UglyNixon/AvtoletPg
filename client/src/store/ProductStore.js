
import {makeAutoObservable} from 'mobx'
export default class ProductStore {

        constructor() {
            this._workers=[
            ]
            this._workerPlace =[]
           
            this._products=[
               ]
                this._selectedPlace={}
                this._selectedWorker={}

         
            makeAutoObservable(this)

        }
        setWorkers (workers) {
            this._workers=workers
        }
        setProducts(products) {
            this._products = products
        }
       
        setWorkerPlace(workerPlace){
            this._workerPlace=workerPlace
        }
        setSelectedPlace(place){
            this._selectedPlace=place
        }
        setSelectedWorker(worker){
            this._selectedWorker=worker
        }
       get workers (){
           return this._workers
       }
       get workerPlace (){
           return this._workerPlace
       }
       get products (){
        return this._products
    }
    
        get selectedPlace(){
            return this._selectedPlace
        }
        get selectedWorker(){
            return this._selectedWorker
        }




}