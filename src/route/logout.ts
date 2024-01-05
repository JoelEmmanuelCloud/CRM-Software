import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.clearCookie('uname');
  res.redirect('/login');
});

export = router;
