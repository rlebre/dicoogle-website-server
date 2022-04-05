function applyExtraSetup(sequelize) {
    const { download_request, user } = sequelize.models;

    user.hasMany(download_request, { foreignKey: 'userId' });
}

module.exports = { applyExtraSetup };