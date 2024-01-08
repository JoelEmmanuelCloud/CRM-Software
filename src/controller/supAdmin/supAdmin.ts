import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { check, validationResult } from 'express-validator';
import supModel from '../../models/supModel';
import adminUserModel from '../../models/adminUserModel';
import router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/create', (req: Request, res: Response) => {
    const message = null;
    res.render('supAdmin/create', { message });
});

router.post('/create', [
    check('name', 'Name must be at least 4 characters').exists().isLength({ min: 4 }),
    check('username', 'Username must be at least 3 characters').exists().isLength({ min: 3 }),
    check('mobile', 'Mobile must be at least 4 characters').exists().isLength({ min: 4 }),
    check('gender', 'Gender must be at least 4 characters').exists().isLength({ min: 4 }),
    check('address', 'Address must be at least 5 characters').exists().isLength({ min: 5 }),
    check('email', 'Email is not valid').isEmail().normalizeEmail()
], (req: Request, res: Response) => {
    const message = null;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alerts = errors.array();
        res.render('supAdmin/create', { alerts, message });
    } else {
        const supAdmin = {
            username: req.body.username,
            name: req.body.name,
            type: req.body.type,
            mobile: req.body.mobile,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            password: req.body.password,
            file: req.files.image
        };

        const file = req.files.image;
        const image = file.name;

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
            file.mv('./assets/uploads/' + file.name, (err) => {
                if (err == null) {
                    supModel.insert(supAdmin, image, (status) => {
                        if (status) {
                            adminUserModel.insert(supAdmin, (status) => {
                                if (status) {
                                    res.redirect('/supAdmin_home/supAdmin');
                                } else {
                                    res.render('supAdmin/create', { message });
                                }
                            });
                        } else {
                            res.render('supAdmin/create', { message });
                        }
                    });
                } else {
                    console.log('Image not uploaded');
                }
            });
        } else {
            const message = 'Invalid image extension';
            res.render('supAdmin/create', { message });
        }
    }
});

router.get('/edit/:id', (req: Request, res: Response) => {
    adminUserModel.getById(req.params.id, (result) => {
        const user = {
            username: result.username,
            password: result.password,
            type: result.type
        };
        res.render('user/edit', user);
    });
});

router.post('/edit/:id', (req: Request, res: Response) => {
    const user = {
        id: req.params.id,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type
    };
    adminUserModel.update(user, (status) => {
        if (status) {
            res.redirect('/home/userlist');
        } else {
            res.render('user/edit', user);
        }
    });
});

router.get('/delete/:id', (req: Request, res: Response) => {
    adminUserModel.getById(req.params.id, (result) => {
        const user = {
            username: result.username,
            password: result.password,
            type: result.type
        };
        res.render('user/delete', user);
    });
});

router.post('/delete/:id', (req: Request, res: Response) => {
    adminUserModel.delete(req.params.id, (status) => {
        if (status) {
            adminUserModel.delete(req.params.id, (status) => {
                if (status) {
                    res.redirect('/home/userlist');
                } else {
                    res.render('supAdmin/delete');
                }
            });
        } else {
            res.render('supAdmin/delete');
        }
    });
});

router.post('/uname', (req: Request, res: Response) => {
    const user = {
        search: req.body.search
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
