import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import productModel from './models/productModel';

const router = express.Router();

router.get('/create', (req: Request, res: Response) => {
  res.render('product/create');
});

router.post(
  '/create',
  [
    check('productCode', 'Product Code can not be null').not().isEmpty().trim().escape(),
    check('productName', 'Product Name must be at least 4 characters long').exists().isLength({ min: 4 }),
    check('productVendor', 'Product Vendor must be at least 4 characters long').exists().isLength({ min: 4 }),
    check('quantityInStock', 'Quantity In Stock can not be null').not().isEmpty().trim().escape(),
    check('buyPrice', 'Buy Price can not be null').not().isEmpty().trim().escape(),
    check('sellPrice', 'Sell Price can not be null').not().isEmpty().trim().escape(),
    check('productDescription', 'Product Description can not be null').not().isEmpty().trim().escape(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const alerts = errors.array();
      res.render('product/create', { alerts });
    } else {
      const product = {
        productCode: req.body.productCode,
        productName: req.body.productName,
        productVendor: req.body.productVendor,
        quantityInStock: req.body.quantityInStock,
        buyPrice: req.body.buyPrice,
        sellPrice: req.body.sellPrice,
        productDescription: req.body.productDescription,
        productImage: req.body.productImage,
      };

      productModel.insert(product, (status) => {
        if (status) {
          res.redirect('/accountingSellsHome/product');
        } else {
          res.redirect('product/create');
        }
      });
    }
  }
);

router.get('/edit/:id', (req: Request, res: Response) => {
  productModel.getById(req.params.id, (result) => {
    const product = {
      productCode: result.productCode,
      productName: result.productName,
      productVendor: result.productVendor,
      quantityInStock: result.quantityInStock,
      buyPrice: result.buyPrice,
      sellPrice: result.sellPrice,
      productDescription: result.productDescription,
      productImage: result.productImage,
    };

    res.render('product/edit', product);
  });
});

router.post(
  '/edit/:id',
  [
    check('productCode', 'Product Code can not be null').not().isEmpty().trim().escape(),
    check('productName', 'Product Name must be at least 4 characters long').exists().isLength({ min: 4 }),
    check('productVendor', 'Product Vendor must be at least 4 characters long').exists().isLength({ min: 4 }),
    check('quantityInStock', 'Quantity In Stock can not be null').not().isEmpty().trim().escape(),
    check('buyPrice', 'Buy Price can not be null').not().isEmpty().trim().escape(),
    check('sellPrice', 'Sell Price can not be null').not().isEmpty().trim().escape(),
    check('productDescription', 'Product Description can not be null').not().isEmpty().trim().escape(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const alerts = errors.array();
      res.render('product/create', { alerts });
    } else {
      const product = {
        id: req.params.id,
        productCode: req.body.productCode,
        productName: req.body.productName,
        productVendor: req.body.productVendor,
        quantityInStock: req.body.quantityInStock,
        buyPrice: req.body.buyPrice,
        sellPrice: req.body.sellPrice,
        productDescription: req.body.productDescription,
        productImage: req.body.productImage,
      };

      productModel.update(product, (status) => {
        if (status) {
          res.redirect('/accountingSellsHome/product');
        } else {
          res.render('product/edit', product);
        }
      });
    }
  }
);

router.get('/delete/:id', (req: Request, res: Response) => {
  productModel.getById(req.params.id, (result) => {
    const product = {
      productCode: result.productCode,
      productName: result.productName,
      productVendor: result.productVendor,
      quantityInStock: result.quantityInStock,
      buyPrice: result.buyPrice,
      sellPrice: result.sellPrice,
      productDescription: result.productDescription,
      productImage: result.productImage,
    };

    res.render('product/delete', product);
  });
});

router.post('/delete/:id', (req: Request, res: Response) => {
  productModel.delete(req.params.id, (status) => {
    if (status) {
      res.redirect('/accountingSellsHome/product');
    }
  });
});

router.post('/search', (req: Request, res: Response) => {
  const product = {
    search: req.body.search,
    searchBy: req.body.searchBy,
  };

  productModel.search(product, (results) => {
    if (results) {
      res.json({ product: results });
    } else {
      res.json({ product: 'error' });
    }
  });
});

export = router;
