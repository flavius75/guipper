'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull:false
      },
      sex: {
        type: Sequelize.STRING,
        allowNull:false
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password: {
        type: Sequelize.STRING
      },
      idCountry: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Countries', 
          key:'id'
        }
      },
      idRole: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Roles', 
          key:'id'
        }
      },
      bio: {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};