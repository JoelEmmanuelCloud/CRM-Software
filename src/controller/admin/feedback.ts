import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import supModel from '../../models/supModel';
import feedbackModel from '../../models/feedbackModel';

const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/solved/:id', (req: Request, res: Response) => {
  feedbackModel.getById(req.params.id, (result) => {
    const user = {
      username: result.username,
      comment: result.comment,
      date: result.date,
      isSolved: result.isSolved,
    };
    res.render('feedback/solved', user);
  });
});

router.post('/solved/:id', (req: Request, res: Response) => {
  const user = {
    id: req.params.id,
    username: req.body.username,
    comment: req.body.comment,
    date: req.body.date,
    isSolved: req.body.isSolved,
  };
  feedbackModel.update(user, (status) => {
    if (status) {
      res.redirect('/admin_home/feedbacks');
    } else {
      res.render('feedback/solved', user);
    }
  });
});

router.get('/delete/:id', (req: Request, res: Response) => {
  feedbackModel.getById(req.params.id, (result) => {
    const user = {
      username: result.username,
      comment: result.comment,
      date: result.date,
      isSolved: result.isSolved,
    };
    res.render('feedback/delete', user);
  });
});

router.post('/delete/:id', (req: Request, res: Response) => {
  feedbackModel.delete(req.params.id, (status) => {
    if (status) {
      res.redirect('/supAdmin_home/feedbacks');
    } else {
      res.render('supAdmin/delete');
    }
  });
});

router.post('/uname', (req: Request, res: Response) => {
  const user = {
    search: req.body.search,
  };

  supModel.search(user, (results) => {
    if (results) {
      res.json({ flag: true });
    } else {
      res.json({ flag: false });
    }
  });
});

export = router;
