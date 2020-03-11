module.exports = {
    cudOperations: function ({
        sequelize_obj,
        body,
        res,
        fields = {},
        method,
        autosend = false
    }) {
        if (!(body == {} || body.length == 0)) {
            return new Promise(resolve => {
                sequelize_obj[method](body, { fields: fields })
                    .then(resVals => {
                        if (autosend) {
                            return res.status(200).send(resVals);
                        } else {
                            resolve(resVals);
                        }
                    })
                    .catch(err => {
                        if (res) {
                            res.status(500).send({ message: "Unable to process your request, please try again later", err });
                        }
                    });
            });
        } else {
            if (res) {
                return res
                    .status(400)
                    .send({ message: "request body not found", err });
            }
        }
    },
    logging: function ({
        action,
        data
    }) {

    },
    checkExistence: function ({
        sequelize_obj,
        query_options,
        res,
        method = "findOne",
        autosend = false
    }) {
        return new Promise(resolve => {
            sequelize_obj[method](query_options)
                .then(model_obj => {
                    if (autosend && res) {
                        return res.status(200).send(model_obj);
                    } else {
                        resolve(model_obj);
                    }
                })
                .catch(err => {
                    if (res) {
                        return res.status(500).send({ message: "Unable to process your request, please try again later", err });
                    }
                });
        });
    }
};
