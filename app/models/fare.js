module.exports = function (sequelize, DataTypes) {
    let Fare = sequelize.define(
        "fare",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            from_location: {
                type: DataTypes.STRING,

            },
            to_location: {
                type: DataTypes.STRING,

            },

            total_amount: {
                type: DataTypes.INTEGER
            },
            createdAt: { type: DataTypes.DATE, field: "created_at" },
            updatedAt: { type: DataTypes.DATE, field: "updated_at" }
        },

        {
            classMethods: {
                associate: function (models) {
                }
            }
        }
    )
    return Fare;
}