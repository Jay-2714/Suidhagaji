export default class Upload{
    constructor(){
        this.promise = new Promise((resolve,reject) => {
            this.resolve=(file)=>{
                this.file = file
                resolve(file)
            }
            this.reject = reject;
        })
        this.promise.catch(()=>{})
    }
}