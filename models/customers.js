module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Burger, {
      onDelete: "cascade"
    });
  };

  return Customer;
};
