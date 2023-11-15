import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';

describe('/api/restaurant', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(["restaurants"]);
    testSession = session(app);
  });

  it("fetch all items from the restaurant table", async () => {
    const response = await testSession.get('/api/restaurants').expect(StatusCodes.OK);
  });

  it("fetch a single item from the restaurant table", async () => {
    const response = await testSession.get('/api/restaurants/1000').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.Name, "Applebee's");
  });
});