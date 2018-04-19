//server/server.js
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import { dbConfig } from './config';

var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb' ,  type: '*/*' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

mongoose.connect('mongodb://sarah:hej@ds247479.mlab.com:47479/hittahem');

app.use('/', router);

module.exports = app;
