



class Auth {
    constructor(){
        this.authentication = false
    }


    login(username="",password=""){
      
        return new Promise((resolve,reject)=>{
            
            
        })

    }
    logout(cb){
        this.authentication = false
        cb();
    }
    isAuthentication(){
        return this.authentication
    }
}
export default new Auth()