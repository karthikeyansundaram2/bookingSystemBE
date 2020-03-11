module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define(
      "users",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING,
          unique: true
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            len: {
              args: [3, 60],
              msg: "Username should be between 3 to 60 characters"
            }
          }
        },
        mobile_number: {
          type: DataTypes.STRING,
          unique: true
        },
        password: {
          type: DataTypes.TEXT,
        },
       
        createdAt: { type: DataTypes.DATE, field: "created_at" },
        updatedAt: { type: DataTypes.DATE, field: "updated_at" }
      },
      {
        classMethods: {
          associate: function (models) { }
        }
      }
    );
    User.prototype.toJSON = function () {
      var values = Object.assign({}, this.get());
      delete values.password;
      delete values.createdAt;
      delete values.updatedAt;
      return values;
    }
    return User;
  };
  