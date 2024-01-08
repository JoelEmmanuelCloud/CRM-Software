import express, { Request, Response, NextFunction } from 'express';
import feature from '../../assets/json/packagefeature.json';
import adminModel from '../../models/adminModel';
import supModel from '../../models/supModel';
import verifyModel from '../../models/verifyModel';
import subscriberModel from '../../models/subscriberModel';
import feedbackModel from '../../models/feedbackModel';
import noticeModel from '../../models/noticeModel';
import adminreportModel from '../../models/adminreportModel';
import pdfMake from '../../assets/pdfmake/pdfmake';
import vfsFonts from '../../assets/pdfmake/vfs_fonts';

pdfMake.vfs = vfsFonts.pdfMake.vfs;

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
    res.render('supAdmin_home/index', { uname });
});

router.get('/subscriber', (req: Request, res: Response) => {
    subscriberModel.getAll((results) => {
        const uname = req.cookies['uname'];
        res.render('supAdmin_home/subscriber', { userlist: results, uname });
    });
});

router.get('/supAdmin', (req: Request, res: Response) => {
    supModel.getAll((results) => {
        const uname = req.cookies['uname'];
        res.render('supAdmin_home/supAdmin', { userlist: results, uname });
    });
});

router.get('/admin', (req: Request, res: Response) => {
    adminModel.getAll((results) => {
        const uname = req.cookies['uname'];
        res.render('supAdmin_home/admin', { userlist: results, uname });
    });
});

router.get('/feedbacks', (req: Request, res: Response) => {
    feedbackModel.getAll((results) => {
        const uname = req.cookies['uname'];
        res.render('supAdmin_home/feedbacks', { userlist: results, uname });
    });
});

router.get('/verification', (req: Request, res: Response) => {
    verifyModel.getAll((results) => {
        const uname = req.cookies['uname'];
        res.render('supAdmin_home/verification', { userlist: results, uname });
    });
});

router.get('/package', (req: Request, res: Response) => {
    const uname = req.cookies['uname'];
    res.render('supAdmin_home/package', { featurelist: feature, uname });
});

router.get('/meeting', (req: Request, res: Response) => {
    noticeModel.getMeeting((results) => {
        const uname = req.cookies['uname'];
        res.render('supAdmin_home/meeting', { userlist: results, uname });
    });
});

router.get('/template', (req: Request, res: Response) => {
    const uname = req.cookies['uname'];
    res.render('supAdmin_home/template', { uname });
});

router.get('/financial', (req: Request, res: Response) => {
    const uname = req.cookies['uname'];
    res.render('supAdmin_home/financialstatus', { uname });
});

router.post('/financial', (req: Request, res: Response) => {
    const uname = req.cookies['uname'];
    adminreportModel.getreportdata((results) => {
        const body: any[][] = [['Year', 'Month', 'Income']];
        results.forEach((element) => {
            body.push([element.Year, element.Month, element.Income]);
        });
        const table = {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto'],
            body: body,
        };
        const documentDefinition = {
            info: {
                title: 'Report Document',
                author: 'Md. Sadek Rayhan Mahi',
                subject: 'Income status',
                keywords: 'income',
            },
            content: [
                {
                    text: 'Income status',
                    style: 'header',
                },
                {
                    layout: 'lightHorizontalLines',
                    table: table,
                },
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                },
            },
        };

        const pdfDoc = pdfMake.createPdf(documentDefinition);
        pdfDoc.getBase64((data) => {
            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment;filename="report.pdf"',
            });
            const download = Buffer.from(data.toString('utf-8'), 'base64');
            res.end(download);
        });
    });
});

export = router;
