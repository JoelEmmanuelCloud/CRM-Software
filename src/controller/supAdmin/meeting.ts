import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { check, validationResult } from 'express-validator';
import adminUserModel from '../../models/adminUserModel';
import supModel from '../../models/supModel';
import { runInNewContext } from 'vm';
import noticeModel from '../../models/noticeModel';

const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/create', (req: Request, res: Response) => {
	res.render('meeting/create');
});

router.post('/create', [
	check('details', 'Details must be at least 10 characters').exists().isLength({ min: 10 }),
], (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		res.render('meeting/create', { alerts });
	} else {
		const user = {
			title: req.body.title,
			concerned_to: req.body.concerned_to,
			date: req.body.date,
			details: req.body.details,
		};

		noticeModel.insert(user, (status) => {
			if (status) {
				res.redirect('/supAdmin_home/meeting');
			} else {
				res.render('meeting/create');
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
			address: result.Address,
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
		address: req.body.address,
	};
	adminModel.update(user, (status) => {
		if (status) {
			res.redirect('/supAdmin_home/admin');
		} else {
			res.render('admin/edit', user);
		}
	});
});

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
