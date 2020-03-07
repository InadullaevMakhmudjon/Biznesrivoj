module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define('Gender', {
    name: DataTypes.STRING,
  }, {});
  Gender.associate = () => {};
  return Gender;
};
