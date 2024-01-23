import express from 'express';
import ProductsController from './src/controller/product-controller.js';
import UserController from './src/controller/user-controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validatemiddleware from './src/middleware/validate-middleware.js';
import { auth } from './src/middleware/auth-middleware.js';
import {validateReqforregister} from './src/middleware/register-validation.js';
import {uploadfile} from './src/middleware/file-upload-middleware.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastvisit-middleware.js';

const app = express();

const productsController = new ProductsController();

const userController=new UserController();

app.use(cookieParser());
// app.use(setLastVisit);

app.use(session({
  secret:'secret key',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false},
})
);
app.use(express.static('public'));
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'view')
);

app.get('/', setLastVisit,auth, productsController.getProducts);
app.get(
  '/add-product',auth,
  productsController.getAddProduct
);

app.get(
    '/update-product/:id',auth,
    productsController.getupdateproductview
  );

  app.get('/register',userController.getregister);

  app.post('/register',validateReqforregister,userController.postregister);


 app.get('/login',userController.getlogin);

 app.post('/login',userController.postLogin);

 app.get('/logout',userController.logout);

app.post('/',auth,uploadfile.single('imageUrl'),validatemiddleware, productsController.postAddProduct);

app.post('/update-product',auth, productsController.postupdateproduct);

app.post('/delete-product/:id',auth, productsController.deleteproduct);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
