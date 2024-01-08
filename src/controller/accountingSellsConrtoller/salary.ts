import express, { Request, Response } from 'express';
import salaryModel from './models/salaryModel';

const router = express.Router();

router.post('/search', (req: Request, res: Response) => {
  const salary = {
    search: req.body.search,
    searchBy: req.body.searchBy,
  };

  salaryModel.search(salary, (results: any) => {
    if (results) {
      res.json({ salary: results });
    } else {
      res.json({ salary: 'error' });
    }
  });
});

export = router;
