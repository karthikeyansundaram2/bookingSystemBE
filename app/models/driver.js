module.exports = function (sequelize, DataTypes) {
    let Driver = sequelize.define(
        "driver",
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
            driver_name: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    len: {
                        args: [3, 60],
                        msg: "driver name should be between 3 to 60 characters"
                    }
                }
            },
            mobile_number: {
                type: DataTypes.STRING,
                unique: true
            },
            rides_preferred: {
                type: DataTypes.JSON,
            },
            password: {
                type: DataTypes.TEXT,
            },
            description: {
                type: DataTypes.JSON
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
    Driver.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());
        delete values.password;
        delete values.createdAt;
        delete values.updatedAt;
        return values;
    }
    return Driver;
};
