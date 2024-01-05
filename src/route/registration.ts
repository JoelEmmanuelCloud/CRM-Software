import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import feature from '../assets/json/packagefeature.json';
import regModel from '../models/regModel';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('login/getstarted', { featurelist: feature });
});

router.post(
  '/',
  [
    check('type', 'Type must be at least 4 characters').exists().isLength({ min: 4 }),
    check('cname', 'Company name must be at least 3 characters').isLength({ min: 3 }),
    check('cmobile', 'Mobile must be at least 4 characters').exists().isLength({ min: 4 }).isNumeric(),
    check('cemployee', 'Employee Number must be at least 1 character').exists().isLength({ min: 1 }).isNumeric(),
    check('caddress', 'Address must be at least 5 characters').exists().isLength({ min: 5 }),
    check('cmname', 'Manager name must be at least 4 characters').exists().isLength({ min: 4 }),
    check('cemail', 'Company Email is not valid').isEmail().normalizeEmail(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      const alerts = errors.array();
      res.render('login/getstarted', { alerts, featurelist: feature });
    } else {
      const user = {
        type: req.body.type,
        cname: req.body.cname,
        cemail: req.body.cemail,
        cmobile: req.body.cmobile,
        cemployee: req.body.cemployee,
        caddress: req.body.caddress,
        cmname: req.body.cmname,
      };

      regModel.insert(user, (status: boolean) => {
        if (status) {
          res.redirect('/login/register');
        } else {
          res.render('login/getstarted');
        }
      });
    }
  }
);

export = router;
