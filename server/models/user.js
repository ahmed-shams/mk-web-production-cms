module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nikcname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    roleId: {
        type: DataTypes.INTEGER
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  // Define relationship with other Models
  User.associate = (db) => {
    db.User.hasMany(db.File, { as: "Files" });
  }

  return User;
};

