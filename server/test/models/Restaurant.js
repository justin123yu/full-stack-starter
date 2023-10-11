import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Restaurant', () => {
  beforeEach(async () => {
    await helper.loadFixtures([]);
  });

  it('creates a new Restaurant record', async () => {
        assert.deepStrictEqual(await models.Restaurant.count(), 0);
        const record = await models.Restaurant.create({
          Name: 'Test Restaurant',
          Location: 'Test Location',
          Comment: 'Test Description',
          Photo: 'Test photo',
          Rating: 5,
          Map: 'Test Map',
        });
        assert.deepStrictEqual(await models.Restaurant.count(), 1);
        assert.notDeepStrictEqual(record.id, null);
        assert.deepStrictEqual(record.Name, 'Test Restaurant');
        assert.deepStrictEqual(record.Location, 'Test Location');
    }); 
  });