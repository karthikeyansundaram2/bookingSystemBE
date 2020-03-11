module.exports = function (sequelize, DataTypes) {
    let Trips = sequelize.define(
        "trips",
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
            trip_type: {
                type: DataTypes.ENUM,
                values: ['one-way', 'round', 'multicity', 'airport']
            },
            pickup_location: {
                type: DataTypes.STRING,
            },
            drop_location: {
                type: DataTypes.STRING
            },
            depart_date: {
                type: DataTypes.DATE
            },
            return_date: {
                type: DataTypes.DATE
            },
            createdAt: { type: DataTypes.DATE, field: "created_at" },
            updatedAt: { type: DataTypes.DATE, field: "updated_at" }
        },

        {
            classMethods: {
                associate: function (models) {
                    Trips.hasMany(models.User, {
                        foreignKey: 'id',
                        onDelete: 'CASCADE'
                    });
                }
            }
        }
    )
    return Trips;
}