//declaration
import express from 'express';
import explayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import exSession from 'express-session';
import cookieParser from 'cookie-parser';
import expfileupload from 'express-fileupload';

import { check, validationResult } from 'express-validator';

import fastcsv from 'fast-csv';
import fs from 'fs';
import nodemailer from 'nodemailer';

import user from './controller/user';
import login from './controller/login';
import home from './controller/home';
import logout from './controller/logout';
import markethome from './controller/marketing/markethome';
import campaigns from './controller/marketing/campaigns';
import clients from './controller/marketing/clients';
import signup from './controller/signup';
import forgotPassword from './controller/forgotPassword';
import accountingSellsHome from './controller/accountingSellsConrtoller/accountingSellsHome';
import customer from './controller/accountingSellsConrtoller/customer';
import product from './controller/accountingSellsConrtoller/product';
import bankInfo from './controller/accountingSellsConrtoller/bankInfo';
import salary from './controller/accountingSellsConrtoller/salary';
import admin_home from './controller/admin/admin_home';
import feedbackadmin from './controller/admin/feedback';
import adminuser from './controller/adminUser';
import supAdmin_home from './controller/supAdmin/supAdmin_home';
import supAdmin from './controller/supAdmin/supAdmin';
import admin from './controller/supAdmin/admin';
import subscriber from './controller/supAdmin/subscriber';
import feedback from './controller/supAdmin/feedback';
import packageController from './controller/supAdmin/package';
import verification from './controller/supAdmin/verification';
import meeting from './controller/supAdmin/meeting';
import registration from './controller/registration';

const app = express();

app.use(explayouts);

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exSession({ secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());
app.use(expfileupload());

app.use('', function (req, res, next) {
  res.locals.glob = req.session.use;
  next();
});

app.use('/user', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/getstarted', registration);
app.use('/forgotPassword', forgotPassword);
app.use('/home', home);
app.use('/markethome', markethome);
app.use('/campaigns', campaigns);
app.use('/clients', clients);
app.use('/supAdmin_home', supAdmin_home);
app.use('/admin_home', admin_home);
app.use('/adminUser', adminuser);
app.use('/supAdmin_home/supAdmin', supAdmin);
app.use('/supAdmin_home/admin', admin);
app.use('/supAdmin_home/subscriber', subscriber);
app.use('/supAdmin_home/verification', verification);
app.use('/supAdmin_home/feedback', feedback);
app.use('/supAdmin_home/package', packageController);
app.use('/admin_home/feedback', feedbackadmin);
app.use('/supAdmin_home/meeting', meeting);
app.use('/accountingSellsHome', accountingSellsHome);
app.use('/accountingSellsHome/customer', customer);
app.use('/accountingSellsHome/product', product);
app.use('/accountingSellsHome/bankInfo', bankInfo);
app.use('/accountingSellsHome/salary', salary);

app.get('/', (req, res) => {
  res.render('login/landing');
});

app.listen(3000, (error) => {
  console.log('express server started at 3000...');
});
