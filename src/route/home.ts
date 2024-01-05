import express, { Request, Response } from 'express';
import userModel from './models/userModel';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  /* if(req.cookies['uname'] != null){
      res.render('home/index');
  }else{
      res.redirect('/login');
  } */
  res.render('home/index');
});

router.get('/userlist', (req: Request, res: Response) => {
  userModel.getAll((results: any[]) => {
    res.render('home/userlist', { userlist: results });
  });
});

router.get('/calendar', (req: Request, res: Response) => {
  res.render('home/calendar');
});

router.get('/invoice', (req: Request, res: Response) => {
  res.render('home/invoice');
});

router.get('/Subscriber', (req: Request, res: Response) => {
  res.render('home/Subscriber');
});

router.get('/supAdmin', (req: Request, res: Response) => {
  res.render('home/supAdmin');
});

router.get('/admin', (req: Request, res: Response) => {
  res.render('home/admin');
});

router.get('/ab', (req: Request, res: Response) => {
  res.render('home/ab');
});

export = router;
