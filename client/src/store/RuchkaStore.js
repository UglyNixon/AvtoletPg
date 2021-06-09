
import {makeAutoObservable} from 'mobx'
export default class RuchkaStore {

        constructor() {
            this._ruchki=[
                {
                    id:1,
                    series:210001,
                    totalValue:1000,
                    dolg:25,
                    status:true,
                    date: '01/21',
                    brak:10,
                    productId:1,
                    workerId:1
                },  {
                    id:1,
                    series:210008,
                    totalValue:1000,
                    dolg:17,
                    status:true,
                    date: '02/21',
                    brak:25,
                    productId:1,
                    workerId:2
                },  {
                    id:1,
                    series:210010,
                    totalValue:1000,
                    dolg:25,
                    status:true,
                    date: '03/21',
                    brak:32,
                    productId:1,
                    workerId:3
                },  {
                    id:1,
                    series:210015,
                    totalValue:1000,
                    dolg:46,
                    status:true,
                    date: '04/21',
                    brak:98,
                    productId:1,
                    workerId:1
                },
            ]
            
         
            makeAutoObservable(this)

        }
        
        setRuchki (ruchki) {
            this._ruchki=ruchki
        }
       
       get ruchki (){
        return this._ruchki
    }
       

}