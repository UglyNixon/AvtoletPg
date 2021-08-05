

const Check= {
    mon(value) {
     return /^\d\d$/.test(value)&&+value>=1&&+value<=12
    },
    year(value) {
        return /^\d\d$/.test(value)&&+value>=19&&+value<=30
       },
       series(value,n){
           if (n==0) return true
           // надо бы тут покапать еще
           if (n==1) return /[1,2]/.test(value)
           return value.match(/\d+/)[0].length==n
       }
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
export {Check,Stat,workerFilter};