import express from 'express';
import nodemailer from 'nodemailer';
import clientsModel from './models/clientsModel';
import campaignsModel from './models/campaignsmodel';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('ee');
  if (req.cookies['uname'] != null) {
    campaignsModel.getAll((results) => {
      res.render('campaigns/camp', { userlist: results });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/search', (req, res) => {
  var campaign = {
    search: req.body.search,
    searchBy: req.body.searchBy,
  };
  campaignsModel.search(campaign, (results) => {
    if (results) {
      console.log(results);
      res.json({ userlist: results });
    } else {
      res.json({ userlist: 'error' });
    }
  });
});

router.get('/mail/:id', async (req, res) => {
  var campaign = {
    search: req.params.id,
    searchBy: 'eventid',
  };
  campaignsModel.search(campaign, async (results) => {
    if (results) {
      var temp = results[0].audience;
      var tab = 'leads';
      var body = results[0].eventdescription;
      if (temp == 'customer') tab = 'customer';

      clientsModel.getAll(tab, async (results) => {
        var str = '';
        if (results.length > 0) {
          for (var i = 0; i < results.length; i++) {
            if (tab == 'leads') str += results[i].email;
            else str += results[i].customerEmail;
            if (i + 1 < results.length) str += ', ';
          }

          let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: 'leola.bins@ethereal.email',
              pass: 'D9nvuffNUCRta84fmH',
            },
          });

          let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: str,
            subject: 'Hello ✔',
            text: body,
          });

          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }

        res.redirect('/markethome');
      });
    } else {
      res.json({ userlist: 'error' });
    }
  });
});

export = router;
