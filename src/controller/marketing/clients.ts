import express from 'express';
import clientsModel from './models/clientsModel';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.get('/create', (req, res) => {
  if (req.cookies['uname'] != null) {
    res.render('marketuser/create');
  } else {
    res.redirect('/login');
  }
});

router.post('/create', [
  check('username', 'Username must be at least 4 characters long').exists().isLength({ min: 4 }),
  check('email', 'Email not valid').isEmail(),
  check('phone', 'Phone must be at least 9 characters long').isLength({ min: 9 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alerts = errors.array();
    res.render('marketuser/create', { alerts });
  } else {
    const tab = req.body.type;
    const user = {
      name: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      status: req.body.status,
    };
    clientsModel.insert(user, tab, (status) => {
      if (status) {
        console.log(status);
        res.redirect('/markethome/' + tab);
      }
    });
  }
});

router.get('/upgrade/:id/:table', (req, res) => {
  const id = req.params.id;
  const tab = req.params.table;
  clientsModel.updatebyid(tab, id, (status) => {
    if (status) {
      res.redirect('/markethome/' + tab);
    }
  });
});

router.get('/profile/:table/:id', (req, res) => {
  const data = req.params.id;
  const tab = req.params.table;
  clientsModel.getById(tab, data, (results) => {
    let user;
    if (tab === 'leads') {
      user = {
        name: results[0].name,
        email: results[0].email,
        phone: results[0].phone,
        status: results[0].status,
        gender: results[0].gender,
        id: results[0].id,
      };
    } else {
      user = {
        name: results[0].customerName,
        email: results[0].customerEmail,
        phone: results[0].customerContactNumber,
        status: results[0].customerStatus,
        gender: results[0].customerGender,
        id: results[0].id,
      };
    }
    res.render('marketuser/profile', { userlist: user });
  });
});

router.post('/profile/:table/:id', (req, res) => {
  const tab = req.params.table;
  const data = req.params.id;
  const user = {
    id: req.params.id,
    name: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
    status: req.body.status,
  };
  console.log('ppppppp');
  console.log(user);
  clientsModel.update(user, tab, (status) => {
    if (status) {
      console.log(status);
      res.redirect('/markethome/' + tab);
    } else {
      console.log('NO');
    }
  });
});

router.get('/delete/:id/:tab', (req, res) => {
  const data = req.params.id;
  const table = req.params.tab;
  clientsModel.delete(data, table, (status) => {
    if (status) {
      res.redirect('/markethome/' + table);
    }
  });
});

export = router;
