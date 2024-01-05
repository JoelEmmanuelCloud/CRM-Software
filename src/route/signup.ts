import express, { Request, Response } from 'express';
import userModel from './models/userModel';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('signup/index');
});

router.post('/', (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  userModel.validate(user, (status: boolean) => {
    if (status) {
      res.cookie('uname', req.body.username);
      res.redirect('/home');
    } else {
      res.redirect('/signup');
    }
  });
});

export = router;
