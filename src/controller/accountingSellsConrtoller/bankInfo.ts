import express, { Request, Response } from 'express';
import bankModel from './models/bankModel';

const router = express.Router();

router.get('/edit/:id', (req: Request, res: Response) => {
  bankModel.getById(req.params.id, (result) => {
    const bankInfo = {
      accountName: result.accountName,
      accountNumber: result.accountNumber,
      bankName: result.bankName,
    };
    res.render('bankInfo/edit', bankInfo);
  });
});

router.post('/edit/:id', (req: Request, res: Response) => {
  const bankInfo = {
    id: req.params.id,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
    bankName: req.body.bankName,
  };

  bankModel.update(bankInfo, (status) => {
    if (status) {
      res.redirect('/accountingSellsHome/bankInfo');
    } else {
      res.render('bankInfo/edit', bankInfo);
    }
  });
});

router.post('/search', (req: Request, res: Response) => {
  const bankInfo = {
    search: req.body.search,
    searchBy: req.body.searchBy,
  };

  bankModel.search(bankInfo, (results) => {
    if (results) {
      res.json({ bankInfo: results });
    } else {
      res.json({ bankInfo: 'error' });
    }
  });
});

export = router;
