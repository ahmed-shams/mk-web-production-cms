module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('file', {
    content: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    parentId: {
      type: DataTypes.INTEGER
    },
    hierarchyLevel: {
      type: DataTypes.INTEGER
    }
  }, {
    hierarchy: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  File.associate = (db) => {
    db.File.belongsTo(db.User);
    db.File.hasMany(db.Revision);
  };

  return File;
};
