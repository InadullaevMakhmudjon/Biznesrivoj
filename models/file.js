
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    createdAt: DataTypes.DATE,
    url: DataTypes.STRING,
  }, {});
  File.associate = () => {};
  return File;
};
