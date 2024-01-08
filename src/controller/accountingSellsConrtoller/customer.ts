import express, { Request, Response } from 'express';
import pdfDocument from 'pdfkit';
import fs from 'fs';
import pdf from 'html-pdf';
import { check, validationResult } from 'express-validator';
import customerModel from './models/customerModel';

const router = express.Router();

router.get('/create', (req: Request, res: Response) => {
  res.render('customer/create');
});

router.post(
  '/create',
  [
    check('customerName', 'Customer Name can not be null').not().isEmpty().trim().escape(),
    check('customerContactNumber', 'Customer Number can not be null').not().isEmpty().trim().escape(),
    check('customerAddress', 'Customer Address can not be null').not().isEmpty().trim().escape(),
    check('customerEmail', 'Customer Email can not be null').not().isEmpty().trim().escape(),
    check('customerStatus', 'Customer Status can not be null').not().isEmpty().trim().escape(),
    check('customerGender', 'Customer Gender can not be null').not().isEmpty().trim().escape(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const alerts = errors.array();
      res.render('customer/create', { alerts });
    } else {
      const customer = {
        customerName: req.body.customerName,
        customerContactNumber: req.body.customerContactNumber,
        customerAddress: req.body.customerAddress,
        customerEmail: req.body.customerEmail,
        customerStatus: req.body.customerStatus,
        customerGender: req.body.customerGender,
      };

      customerModel.insert(customer, (status) => {
        if (status) {
          res.redirect('/accountingSellsHome/customer');
        } else {
          res.redirect('/customer/create');
        }
      });
    }
  }
);

router.get('/edit/:id', (req: Request, res: Response) => {
  customerModel.getById(req.params.id, (result) => {
    const customer = {
      customerName: result.customerName,
      customerContactNumber: result.customerContactNumber,
      customerAddress: result.customerAddress,
      customerEmail: result.customerEmail,
      customerStatus: result.customerStatus,
      customerGender: result.customerGender,
    };

    res.render('customer/edit', customer);
  });
});

router.post(
  '/edit/:id',
  [
    check('customerName', 'Customer Name can not be null').not().isEmpty().trim().escape(),
    check('customerContactNumber', 'Customer Number can not be null').not().isEmpty().trim().escape(),
    check('customerAddress', 'Customer Address can not be null').not().isEmpty().trim().escape(),
    check('customerEmail', 'Customer Email can not be null').not().isEmpty().trim().escape(),
    check('customerStatus', 'Customer Status can not be null').not().isEmpty().trim().escape(),
    check('customerGender', 'Customer Gender can not be null').not().isEmpty().trim().escape(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const alerts = errors.array();
      res.render('customer/create', { alerts });
    } else {
      const customer = {
        id: req.params.id,
        customerName: req.body.customerName,
        customerContactNumber: req.body.customerContactNumber,
        customerAddress: req.body.customerAddress,
        customerEmail: req.body.customerEmail,
        customerStatus: req.body.customerStatus,
        customerGender: req.body.customerGender,
      };

      customerModel.update(customer, (status) => {
        if (status) {
          res.redirect('/accountingSellsHome/customer');
        } else {
          res.render('customer/edit', customer);
        }
      });
    }
  }
);

router.get('/delete/:id', (req: Request, res: Response) => {
  customerModel.getById(req.params.id, (result) => {
    const customer = {
      customerName: result.customerName,
      customerContactNumber: result.customerContactNumber,
      customerAddress: result.customerAddress,
      customerEmail: result.customerEmail,
      customerStatus: result.customerStatus,
      customerGender: result.customerGender,
    };

    res.render('customer/delete', customer);
  });
});

router.post('/delete/:id', (req: Request, res: Response) => {
  customerModel.delete(req.params.id, (status) => {
    if (status) {
      res.redirect('/accountingSellsHome/customer');
    }
  });
});

router.post('/search', (req: Request, res: Response) => {
  const customer = {
    search: req.body.search,
    searchBy: req.body.searchBy,
  };

  customerModel.search(customer, (results) => {
    if (results) {
      res.json({ customer: results });
    } else {
      res.json({ customer: 'error' });
    }
  });
});

export = router;
