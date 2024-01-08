import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { check, validationResult } from 'express-validator';
import supModel from '../../models/supModel';
import feature from '../../assets/json/packagefeature.json';
import { runInNewContext } from 'vm';
import fs from 'fs';

const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/edit', (req: Request, res: Response) => {
	res.render('package/edit', { featurelist: feature });
});

router.post('/edit', (req: Request, res: Response) => {
	function jsonReader(filepath: string, cb: (err: Error | null, data?: any) => void) {
		fs.readFile(filepath, 'utf-8', (err, filedata) => {
			if (err) {
				return cb && cb(err);
			}
			try {
				const object = JSON.parse(filedata);
				return cb && cb(null, object);
			} catch (err) {
				return cb && cb(err);
			}
		});
	}

	jsonReader('./assets/json/packagefeature.json', (err, data) => {
		if (err) {
			console.log(err);
		} else {
			data.s1 = req.body.s1;
			data.s2 = req.body.s2;
			data.s3 = req.body.s3;
			data.s4 = req.body.s4;
			data.s5 = req.body.s5;
			data.s6 = req.body.s6;
			data.a1 = req.body.a1;
			data.a2 = req.body.a2;
			data.a3 = req.body.a3;
			data.a4 = req.body.a4;
			data.a5 = req.body.a5;
			data.a6 = req.body.a6;
			data.e1 = req.body.e1;
			data.e2 = req.body.e2;
			data.e3 = req.body.e3;
			data.e4 = req.body.e4;
			data.e5 = req.body.e5;
			data.e6 = req.body.e6;

			fs.writeFile('./assets/json/packagefeature.json', JSON.stringify(data, null, 2), (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Json updated successfully');
				}
			});
		}
	});

	res.redirect('/supAdmin_home/package');
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
