#!/usr/bin/env node
import fetch from "node-fetch"
import models from "../models/index.js"
const options = {
    method: 'GET',
    headers: {
      Authorization: "Bearer patuEwy7sqnjZ1KI4.68dc2c53f740ec17428f1ca05b7a15fd13dab8ccce2ef57630907ac4982ddbc0"
    }
  };
const url = 'https://api.airtable.com/v0/appWF1wQ4ozIpCeq3/Resturant?sort%5B0%5D%5Bfield%5D=Name&sort%5B0%5D%5Bdirection%5D=asc';
fetch(url, options)
  .then((response) => response.json())
  .then(async (data) => {
    for(const record of data.records){
        await models.Restaurant.create({
            Name: record.fields.Name,
            Location: record.fields.Location,
            Comment: record.fields.Comments,
            Rating: record.fields.Rating,
            Map: record.fields.Map,
        })
    }
  })
console.log('hello world');