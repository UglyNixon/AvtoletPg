let Check= {
    mon(value) {
     return /^\d\d$/.test(value)&&+value>=1&&+value<=12
    },
    year(value) {
        return /^\d\d$/.test(value)&&+value>=19&&+value<=30
       }
}
export {Check};