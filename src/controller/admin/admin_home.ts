import express, { Request, Response, NextFunction } from 'express';
import feature from '../../assets/json/packagefeature.json';
import adminModel from '../../models/adminModel';
import supModel from '../../models/supModel';
import verifyModel from '../../models/verifyModel';
import subscriberModel from '../../models/subscriberModel';
import feedbackModel from '../../models/feedbackModel';
import noticeModel from '../../models/noticeModel';

const router = express.Router();

router.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies['uname'] == null) {
    res.redirect('/login');
  } else {
    next();
  }
});

router.get('/', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('admin_home/index', { uname });
});

router.get('/subscriber', (req: Request, res: Response) => {
  subscriberModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('admin_home/subscriber', { userlist: results, uname });
  });
});

router.get('/supAdmin', (req: Request, res: Response) => {
  supModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('dmin_home/supAdmin', { userlist: results, uname });
  });
});

router.get('/admin', (req: Request, res: Response) => {
  adminModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('admin_home/admin', { userlist: results, uname });
  });
});

router.get('/feedbacks', (req: Request, res: Response) => {
  feedbackModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('admin_home/feedbacks', { userlist: results, uname });
  });
});

router.get('/verification', (req: Request, res: Response) => {
  verifyModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('admin_home/verification', { userlist: results, uname });
  });
});

router.get('/package', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('admin_home/package', { featurelist: feature, uname });
});

router.get('/meeting', (req: Request, res: Response) => {
  noticeModel.getMeeting((results) => {
    const uname = req.cookies['uname'];
    res.render('admin_home/meeting', { userlist: results, uname });
  });
});

router.get('/template', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('admin_home/template', { uname });
});

router.get('/financial', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('admin_home/financialstatus', { uname });
});

export = router;
