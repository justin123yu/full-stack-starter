import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import models from '../../models/index.js';
import interceptors from '../interceptors.js';
import helpers from '../helpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const records = await models.Restaurant.findAll();
    res.json(records);
});

router.get('/:id', async (req, res) => {
    try{
        const records = await models.Restaurant.findByPk(req.params.id);
        res.json(records);
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

router.post('/create', async (req, res) => {
    let restaurant = {
        Name: req.body.Name,
        Location: req.body.Location,
        Photo: req.body.Photo,
        Rating: req.body.Rating,
        Comment: req.body.Comment,
        Map: req.body.Map
      };
      try{
        const records = await models.Restaurant.create(restaurant);
        res.sendStatus(StatusCodes.CREATED);
        res.redirect('/restaurants');
      } catch (err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
      }
});

export default router;