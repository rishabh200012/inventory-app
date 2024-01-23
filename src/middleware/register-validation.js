import {body,validationResult} from 'express-validator'

export const validateReqforregister=async (req,res,next)=>{

const rules=[
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 5 }).withMessage('Password length cannot be less than 5'),
];

await Promise.all(
    rules.map((rule)=>{
       return rule.run(req)
    }));

var errors=validationResult(req);
if (!errors.isEmpty()) {
   res.render('register',  
    {errors: errors.array()[0].msg},
    );
}
else{
    
    next();
}

}

// export default validateReqforregister;