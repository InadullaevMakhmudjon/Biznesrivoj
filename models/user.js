
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    genderId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    quote: DataTypes.STRING,
    active: DataTypes.INTEGER,
    dateOfBirth: DataTypes.DATE,
    roleId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    lastLoggedIn: DataTypes.DATE,
    lastLoggedOut: DataTypes.DATE,
  }, {});
  User.associate = (models) => {
    User.belongsTo(models.Gender, { as: 'gender' });
    User.belongsTo(models.Role, { as: 'role' });
    User.hasMany(models.Article, { as: 'articles' });
  };
  return User;
};
