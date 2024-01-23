
export default class ProductModel {
  constructor(id, name, desc, price, imageUrl) {
      this.id = id;
      this.name = name;
      this.desc = desc;
      this.price = price;
      this.imageUrl = imageUrl;
  }

  static getAll(){
      return products;
  }

  static add( name,  price, desc,imageUrl){
    const newproduct= new ProductModel( products.length+1,name,
      desc,price,imageUrl);
     products.push(newproduct);
  }

  static getById(id){
   return products.find((p)=>{
     return p.id==id
    });
  }

  static update(productobj){
      const index=products.findIndex((p)=>p.id==productobj.id);
     return  products[index]=productobj;
  }

  static delete(productid){
    const index=products.findIndex((p)=>p.id==productid);
     products.splice(index,1);
  }
}


var products = [
  new ProductModel(1, 'Product 1', 'Description for Product 10', 19.99, 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
  new ProductModel(2, 'Product 2', 'Description for Product 2', 29.99, 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
  new ProductModel(3, 'Product 3', 'Description for Product 3', 39.99, 'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'),
];