import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Restaurant', () => {
  beforeEach(async () => {
    await helper.loadFixtures(["restaurants"]);
  });

  it('creates a new Restaurant record', async () => {
        assert.deepStrictEqual(await models.Restaurant.count(), 2);
        const record = await models.Restaurant.create({
          Name: 'Test Restaurant',
          Location: 'Test Location',
          Comment: 'Test Description',
          Photo: 'Test photo',
          Rating: 5,
          Map: 'Test Map',
        });
        assert.deepStrictEqual(await models.Restaurant.count(), 3);
        assert.notDeepStrictEqual(record.id, null);
        assert.deepStrictEqual(record.Name, 'Test Restaurant');
        assert.deepStrictEqual(record.Location, 'Test Location');
    });
    
    it('finds an Restaurant record by its id', async () => {
        const record = await models.Restaurant.findByPk(1000);
        assert.notDeepStrictEqual(record, null);
        assert.deepStrictEqual(record.Name, "Applebee's");
    });

    it("finds mutiple Restaurant records", async () => {
        const records = await models.Restaurant.findAll({
          order:[[ 'Name', 'ASC' ]]
        });
        assert.deepStrictEqual(records.length, 2);
        assert.deepStrictEqual(records[0].Name, "Applebee's");
    });

    it("deletes an Restaurant record", async () => {
      assert.deepStrictEqual(await models.Restaurant.count(), 2);
        const record = await models.Restaurant.findByPk(1000);
        await record.destroy();
        assert.deepStrictEqual(await models.Restaurant.count(), 1);
    });
  });