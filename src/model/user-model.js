
export default  class userModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email=email;
        this.password=password;
        
    }

    static add(name, email, password){
        const newuser= new userModel(users.length+1, name , email, password);
        users.push(newuser);
    }

    static isvaliduser(email, password){
      const result=users.find((u)=>{
       return u.email==email && u.password==password
      })
      return result;
    }

}

var users=[];