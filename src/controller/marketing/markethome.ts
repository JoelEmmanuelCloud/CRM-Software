import express, { Request, Response } from 'express';
import userModel from './models/userModel';
import clientsModel from './models/clientsModel';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (req.cookies['uname'] != null) {
    const user = {
      username: req.session.username,
      id: req.session.idd,
      email: req.session.mail,
      phone: req.session.phone,
      designation: req.session.designation,
    };
    res.render('markethome/index', { userlist: user });
  } else {
    res.redirect('/login');
  }
});

router.get('/profile', (req: Request, res: Response) => {
  if (req.cookies['uname'] != null) {
    const user = {
      username: req.session.username,
      id: req.session.idd,
      designation: req.session.designation,
      email: req.session.mail,
      phone: req.session.phone,
      pass: req.session.pass,
    };
    res.render('markethome/profile', { userlist: user });
  } else {
    res.redirect('/login');
  }
});

router.post(
  '/profile',
  [
    check('username', 'Username must be at least 4 characters long').exists().isLength({ min: 4 }),
    check('email', 'Email not valid').isEmail(),
    check('phone', 'Phone must be at least 9 characters long').isLength({ min: 9 }),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alerts = errors.array();
      const user = {
        username: req.body.username,
        id: req.session.idd,
        email: req.body.email,
        phone: req.body.phone,
        designation: req.body.designation,
      };
      console.log(user);
      res.render('markethome/profile', { alerts, userlist: user });
    } else {
      const user = {
        username: req.body.username,
        id: req.session.idd,
        email: req.body.email,
        phone: req.body.phone,
        designation: req.body.designation,
      };
      userModel.update(user, (status) => {
        if (status) {
          console.log('here');
          res.cookie('uname', req.body.username);
          req.session.use = user;
          req.session.mail = user.email;
          req.session.phone = user.phone;
          req.session.username = user.username;
          req.session.idd = user.id;
          req.session.pass = user.pass;
          req.session.designation = user.designation;
          res.redirect('/markethome/profile');
        } else {
          console.log(user);
          res.render('markethome/profile', { userlist: user });
        }
      });
    }
  }
);

router.get('/:id', (req: Request, res: Response) => {
  if (req.cookies['uname'] != null) {
    const data = req.params.id;
    if (data == 'leads') {
      clientsModel.getAll('leads', (results) => {
        console.log(results);
        res.render('markethome/leadslist', { userlist: results });
      });
    } else {
      clientsModel.getAll('customer', (results) => {
        res.render('markethome/customerlist', { userlist: results });
      });
    }
  } else {
    res.redirect('/login');
  }
});

router.get('/csv
