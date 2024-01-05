import express, { Request, Response } from 'express';
import session, { Session, SessionData } from 'express-session';
import { validationResult, check } from 'express-validator';
import userModel from './models/userModel';
import adminUserModel from './models/adminUserModel';

interface CustomSession extends Session {
  use: {
    username: string;
    id: string;
    type: string;
    email: string;
    phone: string;
    pass: string;
  };
  designation: string;
  mail: string;
  phone: string;
  username: string;
  idd: string;
  pass: string;
}

const router = express.Router();

router.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

router.get('/', (req: Request, res: Response) => {
  res.render('login/index');
});

router.post('/', (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  userModel.validate(user, (status: boolean, results: any[]) => {
    if (status) {
      console.log(results);
      res.cookie('uname', req.body.username);

      const user = {
        username: results[0].username,
        id: results[0].id,
        type: results[0].type,
        email: results[0].email,
        phone: results[0].contactNumber,
        pass: results[0].password,
      };


      const customSession: CustomSession = {
        use: user,
        designation: results[0].designation,
        mail: results[0].email,
        phone: results[0].contactNumber,
        username: results[0].username,
        idd: results[0].id,
        pass: results[0].password,
      };

      req.session = customSession;

      if (user.type == 'Manager') {
        res.redirect('/manager_home');
      } else if (user.type == 'accountingSells') {
        res.redirect('/accountingSellsHome');
        console.log(user.username);
      } else if (user.type == 'employee') {
        res.redirect('/markethome');
        console.log(user.username);
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  });
});


router.get('/adminlogin', (req: Request, res: Response) => {
  const message = null;
  res.render('login/adminlogin', { message: message });
});

router.post('/adminlogin', (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  adminUserModel.validate(user, (result: any) => {
    if (result) {
      res.cookie('uname', req.body.username);
      const user = {
        username: result.username,
        password: result.password,
        type: result.type,
      };

      console.log(user);

      if (user.type == 'Super Admin') {
        res.redirect('/supAdmin_home');
      } else if (user.type == 'Admin') {
        res.redirect('/admin_home');
      } else {
        const message = 'Wrong Username or password';
        res.render('login/adminlogin', { message: message });
      }
    } else {
      const message = 'Wrong Username or password';
      res.render('login/adminlogin', { message: message });
    }
  });
});

router.get('/register', (req: Request, res: Response) => {
  res.render('login/register');
});

router.post(
  '/register',
  [
    check('cmname', 'Name must be at least 4 characters').exists().isLength({ min: 4 }),
    check('username', 'Username must be at least 3 characters').exists().isLength({ min: 3 }).isAlpha(),
    check('password', 'Password must be at least 4 characters').exists().isLength({ min: 4 }),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      const alerts = errors.array();
      res.render('login/register', { alerts });
    } else {
      const user = {
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
      };

      userModel.insert(user, (status: boolean) => {
        if (status) {
          adminUserModel.insert(user, (status: boolean) => {
            if (status) {
              res.redirect('/login');
            } else {
              res.redirect('/login/register');
            }
          });
        } else {
          res.redirect('/login/register');
        }
      });
    }
  }
);

export = router;
