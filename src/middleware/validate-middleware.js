import {body,validationResult} from 'express-validator'

const validateReq=async (req,res,next)=>{

const rules=[
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({gt:0}).withMessage('Price cannot be a negative number'),
  body('imageUrl').custom((value,{req})=>{
    if(!req.file){
      throw new Error('Image is required');
    }
    else{
      return true;
    }
  })
];

await Promise.all(rules.map(rule=>rule.run(req)));

var validationError=validationResult(req);



// const { name, price, imageUrl } = req.body;        using express-validator instead of this .....
// let errors = [];
// if (!name || name.trim() == '') {
//   errors.push('Name is required');
// }
// if (!price || parseFloat(price) < 1) {
//   errors.push(
//     'Price must be a positive value'
//   );
// }
// try {
//   const validUrl = new URL(imageUrl);
// } catch (err) {
//   errors.push('URL is invalid');
// }

console.log(validationError);

if (!validationError.isEmpty()) {
  return res.render('new-product', {
    errorMessage: validationError.array()[0].msg,
  });
}
next();
}

export default validateReq;
