module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('file', {
    content: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    parentId: {
      type: DataTypes.INTEGER
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  File.associate = (db) => {
    db.File.belongsTo(db.User);
    db.File.hasMany(db.Revision);
  };

  return File;
};


// module.exports = (sequelize, DataTypes) => {
//   const Category = sequelize.define(
//     'Category',
//     {
//       name: {
//         allowNull: false,
//         type: DataTypes.STRING
//       },
//       parent: { type: DataTypes.INTEGER }
//     },
//     {}
//   );
//   Category.associate = function(models) {
//     models.Category.hasMany(models.Category, {
//       onDelete: 'CASCADE',
//       foreignKey: 'parent',
//       as: 'children'
//     });
//   };
//   return Category;
// };