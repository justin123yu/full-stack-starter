import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';
import helper from '../../helper.js';
import models from "../../../models/index.js"
import app from '../../../app.js';

describe('/api/restaurant', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(["restaurants"]);
    testSession = session(app);
  });

  it("Delete a Restaurant", async () => {
    const response = await testSession.delete('/api/restaurants/1001').expect(StatusCodes.OK);
    const records = await models.Restaurant.findByPk(response.body.id);
    assert.deepStrictEqual(records, null);
  });

  it("Update a Restaurant information", async () => {
    const response = await testSession.patch('/api/restaurants/1000').send({
      Name: "Hello World",
      Location: "temp",
      Rating: 3,
      Comment: "It's a restaurant",
      Map: "https://goo.gl/maps/123"
    }).expect(StatusCodes.OK);
    const records = await models.Restaurant.findByPk(response.body.id);
    assert.deepStrictEqual(records.Name, "Hello World");
    assert.deepStrictEqual(records.Location, "temp");
  });

  it("Create a new Restaurant", async () => { 
    const response = await testSession.post('/api/restaurants').send({
      Name: "Hello World",
      Location: "temp",
      Rating: 3,
      Comment: "It's a restaurant",
      Map: "https://goo.gl/maps/123"
    }).expect(StatusCodes.CREATED);
    const records = await models.Restaurant.findByPk(response.body.id);
    assert.deepStrictEqual(records.Name, "Hello World");
    assert.deepStrictEqual(records.Location, "temp");

  });

  it("fetch all items from the restaurant table", async () => {
    const response = await testSession.get('/api/restaurants').expect(StatusCodes.OK);
  });

  it("fetch a single item from the restaurant table", async () => {
    const response = await testSession.get('/api/restaurants/1000').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.Name, "Applebee's");
  });
});