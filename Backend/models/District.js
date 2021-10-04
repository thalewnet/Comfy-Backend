module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define(
    'District',
    {
      district: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      amphoe: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      districtCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      amphoeCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      provinceCode: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  return District;
};
