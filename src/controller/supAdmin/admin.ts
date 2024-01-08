import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { check, validationResult } from 'express-validator';
import adminUserModel from '../../models/adminUserModel';
import supModel from '../../models/supModel';
import { runInNewContext } from 'vm';
import adminModel from '../../models/adminModel';

const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/create', (req: Request, res: Response) => {
	res.render('admin/create');
});

router.post('/create', [
	check('name', 'Name must be at least 4 characters').exists().isLength({ min: 4 }),
	check('mobile', 'Mobile must be at least 4 characters').exists().isLength({ min: 4 }),
	check('gender', 'Gender must be at least 4 characters').exists().isLength({ min: 4 }),
	check('address', 'Address must be at least 5 characters').exists().isLength({ min: 5 }),
	check('email', 'Email is not valid').isEmail().normalizeEmail()
], (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		res.render('admin/create', { alerts });
	} else {
		const user = {
			username: req.body.username,
			name: req.body.name,
			type: req.body.type,
			mobile: req.body.mobile,
			email: req.body.email,
			gender: req.body.gender,
			address: req.body.address,
			password: req.body.password
		};

		adminModel.insert(user, (status) => {
			if (status) {
				adminUserModel.insert(user, (status) => {
					if (status) {
						res.redirect('/admin_home/admin');
					} else {
						res.render('admin/create');
					}
				});
			} else {
				res.render('admin/create');
			}
		});
	}
});

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

router.post('/edit/:id', [
	check('name', 'Name must be at least 4 characters').exists().isLength({ min: 4 }),
	check('mobile', 'Mobile must be at least 4 characters').exists().isLength({ min: 4 }),
	check('gender', 'Gender must be at least 4 characters').exists().isLength({ min: 4 }),
	check('address', 'Address must be at least 5 characters').exists().isLength({ min: 5 }),
	check('email', 'Email is not valid').isEmail().normalizeEmail()
], (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		res.render('admin/edit', { alerts });
	} else {
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
	}
});

router.get('/delete/:id', (req: Request, res: Response) => {
	adminModel.getById(req.params.id, (result) => {
		const user = {
			name: result.Name,
			mobile: result.Mobile,
			email: result.Email,
			gender: result.Gender,
			address: result.Address
		};
		res.render('admin/delete', user);
	});
});

router.post('/delete/:id', (req: Request, res: Response) => {
	adminModel.delete(req.params.id, (status) => {
		if (status) {
			adminUserModel.delete(req.params.id, (status) => {
				if (status) {
					res.redirect('/supAdmin_home/admin');
				} else {
					res.render('admin/delete');
				}
			});
		} else {
			res.render('admin/delete');
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
