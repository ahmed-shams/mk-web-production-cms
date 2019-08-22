module.exports = (sequelize, DataTypes) => {
  const Revision = sequelize.define('Revision', {
    content: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  Revision.associate = (db) => {
    db.Revision.belongsTo(db.User);
    db.Revision.belongsTo(db.File);
  }

  return Revision;
};
