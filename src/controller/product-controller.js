import ProductModel from '../model/product-model.js';

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render('index', { products, userEmail:req.session.userEmail });
  }

  getAddProduct(req, res, next) {
    res.render('new-product', {
      errorMessage: null, userEmail:req.session.userEmail
    });
  }

  postAddProduct(req, res, next) {
    const {name, desc ,price}=req.body;
    const imageUrl='images/'+req.file.filename;
    ProductModel.add(name,price,desc,imageUrl);
    var products = ProductModel.getAll();
    res.render('index', { products, userEmail:req.session.userEmail });
  }

  getupdateproductview(req, res, next){
    //   const {id}=req.body;      // destructuring.........
    const id=req.params.id;
      const productfound=  ProductModel.getById(id);

      if(productfound){
        res.render('update-product',{product:productfound , errorMessage:null, userEmail:req.session.userEmail})
      }
      else{
        res.status(401).send('product not found');
      }
  }

  postupdateproduct(req, res, next){
        
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }


  deleteproduct(req, res){
   const id=req.params.id;

   const productfound=  ProductModel.getById(id);

      if(!productfound){
        res.status(401).send("product not found");
      }

   ProductModel.delete(id);
   var products = ProductModel.getAll();
   res.render('index', { products });

  }
}

export default ProductsController;
