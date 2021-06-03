
import {makeAutoObservable} from 'mobx'
export default class RuchkaStore {

        constructor() {
            this._workers=[
               { id:1,code:47},
               { id:2,code:48},
               { id:3,code:49},
            ]
            this._ruchki=[
                {
                    id:1,
                    series:210001,
                    totalValue:1000,
                    dolg:25,
                    status:true,
                    date: '01/21',
                    brak:25,
                    productId:1,
                    workerId:1
                },  {
                    id:1,
                    series:210008,
                    totalValue:1000,
                    dolg:25,
                    status:true,
                    date: '01/21',
                    brak:25,
                    productId:1,
                    workerId:2
                },  {
                    id:1,
                    series:210010,
                    totalValue:1000,
                    dolg:25,
                    status:true,
                    date: '01/21',
                    brak:25,
                    productId:1,
                    workerId:3
                },  {
                    id:1,
                    series:210015,
                    totalValue:1000,
                    dolg:25,
                    status:true,
                    date: '01/21',
                    brak:25,
                    productId:1,
                    workerId:1
                },
            ]
            this._product=[
                {
                    id:1,
                    title:'Ручка',
                    img:'ac1dcd76-88c7-4cd6-802a-bd7cebf513cf.jpeg'
                },{
                    id:2,
                    title:'Плата',
                    img:'ac1dcd76-88c7-4cd6-802a-bd7cebf513cf.jpeg'
                },{
                    id:3,
                    title:'Кодовая полоска',
                    img:'ac1dcd76-88c7-4cd6-802a-bd7cebf513cf.jpeg'
                },{
                    id:4,
                    title:'Паспорта',
                    img:'ac1dcd76-88c7-4cd6-802a-bd7cebf513cf.jpeg'
                }]

         
            makeAutoObservable(this)

        }
        setWorkers (workers) {
            this._workers=workers
        }
        setProduct(product) {
            this._product = product
        }
        setRuchki (ruchki) {
            this._ruchki=ruchki
        }
       get workers (){
           return this._workers
       }
       get product (){
        return this._product
    }
       get ruchki (){
        return this._ruchki
    }




}