module.exports = function(sequelize, DataTypes) {
  const Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Burger.associate = function(models) {
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Burger;
};
