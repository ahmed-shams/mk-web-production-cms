module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    content: {
      type: DataTypes.TEXT,
    }
  })
}