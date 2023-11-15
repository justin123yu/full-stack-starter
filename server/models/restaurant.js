import { Model, Op } from 'sequelize';
export default function (sequelize, DataTypes){
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Restaurant.init({
    Name: DataTypes.STRING,
    Location: DataTypes.STRING,
    Photo: DataTypes.STRING,
    PhotoUrl:{
      type: DataTypes.VIRTUAL,
        get(){
          return this.assetUrl('Photo');
        }
    },
    Rating: DataTypes.INTEGER,
    Comment: DataTypes.TEXT,
    Map: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Restaurant',
  });

  Restaurant.afterSave(async (record, options) => {
    record.handleAssetFile('Photo', options);
  });


  return Restaurant;
};