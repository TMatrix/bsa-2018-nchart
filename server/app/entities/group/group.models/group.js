const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');
const GroupUser = require('./group_user');

const Group = sequelize.define('group', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	companyId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

Group.sync().then(() => {
	GroupUser.sync().then(() => {
		Group.hasMany(GroupUser, {
			foreignKey: 'groupId',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			constraints: false
		});
	});
	GroupUser.belongsTo(Group, { foreignKey: 'groupId' });
});

module.exports = Group;
