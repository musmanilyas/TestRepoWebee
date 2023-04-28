import { QueryInterface ,DataTypes} from 'sequelize';
import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns';
export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

    up: async (queryInterface: QueryInterface): Promise<void> => {
      await queryInterface.createTable('Movies', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
  
      await queryInterface.createTable('Showrooms', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
  
      await queryInterface.createTable('Shows', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        movieId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Movies',
            key: 'id',
          },
        },
        showroomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Showrooms',
            key: 'id',
          },
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
  
      await queryInterface.createTable('Seats', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        showroomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Showrooms',
            key: 'id',
          },
        },
        seatNumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('standard', 'vip', 'couple', 'super-vip'),
          allowNull: false,
          defaultValue: 'standard',
        },
        priceMultiplier: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 1.0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
  
      await queryInterface.createTable('bookings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        showtimeId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'showtimes',
            key: 'id'
          }
        },
        userId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        seatId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'seats',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
      });
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

};
