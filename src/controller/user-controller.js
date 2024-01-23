import userModel from "../model/user-model.js";
import ProductModel from "../model/product-model.js";

export default class userController{
      getregister(req, res){
         res.render('register',{errors:null})
      }
    //  validateuser(){
    //     console.log("validator function called.")
    //  }
      getlogin(req, res){
         res.render('login',{errors:null})
      }

      postLogin(req,res){
        const {email , password}=req.body;
        const check=userModel.isvaliduser(email,password);
        if(!check){
        res.render('login',{errors:'Invalid credentials'});
        }
        else{
            req.session.userEmail =email;
            var products = ProductModel.getAll();
            res.render('index', { products , userEmail:req.session.userEmail});
        }
      }

      postregister(req, res){
        const {name , email, password}=req.body;
        userModel.add(name,email,password);
        res.render('login',{errors:null});
      }

      logout(req, res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.clearCookie('lastVisit');
                res.redirect('/login');
            }
        })
      }
}