

const Check= {
    mon(value) {
     return /^\d\d$/.test(value)&&+value>=1&&+value<=12
    },
    year(value) {
        return /^\d\d$/.test(value)&&+value>=19&&+value<=30
    },
    inputNUmbers(value,n){
           
           if (n==0) return true
           // надо бы тут покапать еще
           if (n==1) return /[1,2]/.test(value)
           if (n==2&&/^[1]/.test(value)) return /[1][8,9]/.test(value)
           return value.match(/\d+/)[0].length==n
    },
    series (value){
        return /\d{6}/.test(value)
    },
    

}
const workerFilter =(ruchki,name=0)=>{
    
   let a=[]
    if (name!=0) {
        return a=  ruchki.filter(i=>i.workerId==name)
    }
 
    return  a= ruchki
     
   }


const Stat = {
    made (filter,a) {

    return a.reduce((total,r)=>total+r[filter],0);
    },
    count (filter,a){
    return a.filter(i=>i[filter]>0).length
    }

}
// допилить валидацию
const defCheckForm = (arr) =>{

return true
}
export {Check,Stat,workerFilter,defCheckForm};