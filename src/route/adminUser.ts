import express, { Request, Response } from 'express';
import adminUserModel from './models/adminUserModel';
import { validationResult } from 'express-validator';
const router = express.Router();

router.get('/create', (req: Request, res: Response) => {
  res.render('user/create');
});

router.post('/create', (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  };

  adminUserModel.insert(user, (status: boolean) => {
    if (status) {
      res.redirect('/home/userlist');
    } else {
      res.redirect('user/create');
    }
  });
});

router.get('/edit/:id', (req: Request, res: Response) => {
  adminUserModel.getById(req.params.id, (result: any) => {
    const user = {
      username: result.username,
      password: result.password,
      type: result.type,
    };

    res.render('user/edit', user);
  });
});

router.post('/edit/:id', (req: Request, res: Response) => {
  const user = {
    id: req.params.id,
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  };

  adminUserModel.update(user, (status: boolean) => {
    if (status) {
      res.redirect('/home/userlist');
    } else {
      res.render('user/edit', user);
    }
  });
});

router.get('/delete/:id', (req: Request, res: Response) => {
  adminUserModel.getById(req.params.id, (result: any) => {
    const user = {
      username: result.username,
      password: result.password,
      type: result.type,
    };

    res.render('user/delete', user);
  });
});

router.post('/delete/:id', (req: Request, res: Response) => {
  adminUserModel.delete(req.params.id, (status: boolean) => {
    if (status) {
      res.redirect('/home/userlist');
    }
  });
});

export = router;
