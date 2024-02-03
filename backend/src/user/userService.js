const userModel = require('./userModel');

const getDataFromDBService = () => userModel.find({});

const createUserDBService = (userDetails) => {
    const userModelData = new userModel(userDetails);
    return userModelData.save().then(() => true);
};

const updateUserDBService = (id, userDetails) => {
    return userModel.findByIdAndUpdate(id, userDetails).then((result) => result);
};

const removeUserDBService = (id) => userModel.findByIdAndDelete(id);

module.exports = {
    getDataFromDBService,
    createUserDBService,
    updateUserDBService,
    removeUserDBService
};