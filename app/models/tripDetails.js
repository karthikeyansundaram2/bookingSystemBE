module.exports = function (sequelize, DataTypes) {
    let tripDetails = sequelize.define(
        "trip_details",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            driver_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'driver',
                    key: 'id'
                }
            },
            trip_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "trips",
                    key: "id"
                }
            },
            total_amount: {
                type: DataTypes.INTEGER
            },
            driver_rating: {
                type: DataTypes.STRING
            },

            createdAt: { type: DataTypes.DATE, field: "created_at" },
            updatedAt: { type: DataTypes.DATE, field: "updated_at" }
        },

        {
            classMethods: {
                associate: function (models) {
                    tripDetails.belongsTo(models.User, {
                        foreignKey: 'user_id',
                        onDelete: 'CASCADE'
                    });
                    tripDetails.belongsTo(models.Drivers, {
                        foreignKey: 'driver_id',
                        onDelete: 'CASCADE'
                    });
                    tripDetails.belongsTo(models.trips, {
                        foreignKey: 'trip_id',
                        onDelete: 'CASCADE'
                    })
                }
            }
        }
    )
    return tripDetails;
}