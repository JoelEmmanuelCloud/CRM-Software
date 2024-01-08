import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import adminModel from '../../models/adminModel';
import subscriberModel from '../../models/subscriberModel';

const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/delete/:id', (req: Request, res: Response) => {
    adminModel.getById(req.params.id, (result) => {
        const user = {
            name: result.Name,
            mobile: result.Mobile,
            email: result.Email,
            gender: result.Gender,
            address: result.Address,
        };

        res.render('admin/delete', user);
    });
});

router.post('/delete/:id', (req: Request, res: Response) => {
    adminModel.delete(req.params.id, (status) => {
        if (status) {
            res.redirect('/supAdmin_home/admin');
        }
    });
});

router.post('/uname', (req: Request, res: Response) => {
    const user = {
        search: req.body.search,
    };

    subscriberModel.search(user, (results) => {
        if (results) {
            res.json({ flag: false });
        } else {
            res.json({ flag: true });
        }
    });
});

export = router;
