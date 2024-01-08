import express, { Request, Response } from 'express';
import pdf from 'html-pdf';
import customerModel from '././models/customerModel';
import productModel from '././models/productModel';
import bankModel from '././models/bankModel';
import salaryModel from '././models/salaryModel';
import sellsReportModel from '././models/sellsReportModel';
import pdfMake from '../../assets/pdfmake/pdfmake';
import vfsFonts from '../../assets/pomace/vfs_fonts';

pdfMake.vfs = vfsFonts.pdfMake.vfs;

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (req.cookies['uname'] != null) {
    const uname = req.cookies['uname'];
    res.render('accountingSellsHome/index', { uname });
  } else {
    res.redirect('/login');
  }
});

router.get('/product', (req: Request, res: Response) => {
  productModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('accountingSellsHome/product', { productList: results, uname });
  });
});

router.get('/customer', (req: Request, res: Response) => {
  customerModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('accountingSellsHome/customer', { customerList: results, uname });
  });
});

router.get('/pdf', (req: Request, res: Response) => {
  pdf.create(html, options).toFile('assets/uploads/customerList.pdf', (err, response) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(response);
    }
  });
  customerModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('accountingSellsHome/customer', { customerList: results, uname });
  });
});

router.get('/report', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('accountingSellsHome/report', { uname });
});

router.post('/report', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  const productReport = req.body.productReport;

  if (req.body.type == 1) {
    sellsReportModel.getCountProduct((results) => {
      const type = 'Total Number of Product is :' + results[0].count;
      const documentDefinition = {
        content: [type],
      };
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.getBase64((data) => {
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment;filename="productReport.pdf"',
        });
        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
      });
    });
  } else if (req.body.type == 2) {
    sellsReportModel.getCountCustomer((results) => {
      const type = 'Total Number of Customer is :' + results[0].count;
      const documentDefinition = {
        content: [type],
      };
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.getBase64((data) => {
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment;filename="customerReport.pdf"',
        });
        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
      });
    });
  } else if (req.body.type == 3) {
    sellsReportModel.getInventory((results) => {
      const type = 'Total Number of Product in inventory is :' + results[0].inventory;
      const documentDefinition = {
        content: [type],
      };
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.getBase64((data) => {
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment;filename="inventoryReport.pdf"',
        });
        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
      });
    });
  }
});

router.get('/revenue', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('accountingSellsHome/revenue', { uname });
});

router.get('/salary', (req: Request, res: Response) => {
  salaryModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('accountingSellsHome/salary', { salaryList: results, uname });
  });
});

router.get('/bankInfo', (req: Request, res: Response) => {
  bankModel.getAll((results) => {
    const uname = req.cookies['uname'];
    res.render('accountingSellsHome/bankInfo', { bankInfo: results, uname });
  });
});

router.get('/calendar', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('accountingSellsHome/calendar', { uname });
});

router.get('/profile', (req: Request, res: Response) => {
  const uname = req.cookies['uname'];
  res.render('accountingSellsHome/profile', { uname });
});

export = router;
