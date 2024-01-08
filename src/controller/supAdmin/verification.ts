import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { check, validationResult } from 'express-validator';
import subscriberModel from '../../models/subscriberModel';
import verificationModel from '../../models/verificationModel';

const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/edit/:id', (req: Request, res: Response) => {
    adminModel.getById(req.params.id, (result) => {
        const user = {
            name: result.Name,
            mobile: result.Mobile,
            email: result.Email,
            gender: result.Gender,
            address: result.Address
        };
        res.render('admin/edit', user);
    });
});

router.post('/edit/:id', (req: Request, res: Response) => {
    const user = {
        id: req.params.id,
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address
    };
    adminModel.update(user, (status) => {
        if (status) {
            res.redirect('/supAdmin_home/admin');
        } else {
            res.render('admin/edit', user);
        }
    });
});

router.get('/verify/:id', (req: Request, res: Response) => {
    verificationModel.getById(req.params.id, (result) => {
        const user = {
            type: result.Subscription_Type,
            cname: result.Company_Name,
            cemail: result.Company_Email,
            cmobile: result.Contact_No,
            caddress: result.Company_Address,
            cmname: result.Manager_Name,
        };
        let amount;
        if (result.Subscription_Type === 'Stand') {
            amount = '100';
        } else if (result.Subscription_Type === 'Advan') {
            amount = '150';
        } else {
            amount = '250';
        }
        res.render('verification/verify', { user, amount });
    });
});

router.post('/verify/:id', [
    check('type', 'Type must be at least 2 characters').exists().isLength({ min: 2 }),
    check('cname', 'Company name must be at least 3 characters').exists().isLength({ min: 3 }),
    check('cmobile', 'Mobile must be at least 4 characters').exists().isLength({ min: 4 }),
    check('cmname', 'Manager Name must be at least 4 characters').exists().isLength({ min: 4 }),
    check('caddress', 'Address must be at least 5 characters').exists().isLength({ min: 5 }),
    check('cemail', 'Email is not valid').isEmail().normalizeEmail()
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alerts = errors.array();
        res.render('verification/verify', { alerts });
    } else {
        verificationModel.delete(req.params.id, (status) => {
            if (status) {
                const user = {
                    type: req.body.type,
                    cname: req.body.cname,
                    cemail: req.body.cemail,
                    cmobile: req.body.cmobile,
                    caddress: req.body.caddress,
                    cmname: req.body.cmname,
                    date: req.body.date,
                    fee: req.body.fee
                };
                subscriberModel.insert(user, async (status) => {
                    if (status) {
                        verificationModel.insertreport(user, async (status) => {
                            if (status) {
                                const transporter = nodemailer.createTransport({
                                    host: 'smtp.ethereal.email',
                                    port: 587,
                                    secure: false,
                                    auth: {
                                        user: 'leola.bins@ethereal.email',
                                        pass: 'D9nvuffNUCRta84fmH'
                                    },
                                });

                                const info = await transporter.sendMail({
                                    from: '"DESKAPP" <deskapp123@yahoo.com>',
                                    to: user.cemail,
                                    subject: 'Payment Done',
                                    text: `Your 1 month '${user.type}' subscription of DESKAPP activated successfully.`,
                                    html: "<a href='http://localhost:3000/login/register'>Click Here</a> to register"
                                });
                                console.log(`Message sent: ${info.messageId}`);
                                console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
                                res.redirect('/supAdmin_home/verification');
                            }
                        });
                    } else {
                        res.render('verification/verify');
                    }
                });
            } else {
                res.render('verification/verify');
            }
        });
    }
});

router.post('/uname', (req: Request, res: Response) => {
    const user = {
        search: req.body.search
    };
    verificationModel.search(user, (results) => {
        if (results) {
            res.json({ flag: true });
        } else {
            res.json({ flag: false });
        }
    });
});

export = router;
