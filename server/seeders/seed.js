const db = require('../config/connection');
const { User, Course, Game } = require('../models');
const clearDB = require('./clearDB');

db.once('open', async () => {
    try {
        await clearDB('User', 'users');
        await clearDB('Course', 'courses');
        await clearDB('Game', 'games');

        // Create Users
        const user1 = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password'
        });

        const user2 = await User.create({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@example.com',
            password: 'password'
        });

        // Create Courses
        const course1 = await Course.create({
            courseName: 'Dream Land Challenge Course - Red',
            numberOfHoles: 18,
            holes: [
                { holeNumber: 1, par: 3},
                { holeNumber: 2, par: 3},
                { holeNumber: 3, par: 3},
                { holeNumber: 4, par: 3},
                { holeNumber: 5, par: 2},
                { holeNumber: 6, par: 3},
                { holeNumber: 7, par: 2},
                { holeNumber: 8, par: 4},
                { holeNumber: 9, par: 3},
                { holeNumber: 10, par: 3},
                { holeNumber: 11, par: 3},
                { holeNumber: 12, par: 3},
                { holeNumber: 13, par: 3},
                { holeNumber: 14, par: 2},
                { holeNumber: 15, par: 3},
                { holeNumber: 16, par: 3},
                { holeNumber: 17, par: 2},
                { holeNumber: 18, par: 3},
            ],
            totalPar: 51,
            color: 'rgba(135, 0, 0, 0.22)'
        });

        const course2 = await Course.create({
            courseName: 'Dream Land Challenge Course - Green',
            numberOfHoles: 18,
            holes: [
                { holeNumber: 1, par: 4},
                { holeNumber: 2, par: 4},
                { holeNumber: 3, par: 3},
                { holeNumber: 4, par: 3},
                { holeNumber: 5, par: 3},
                { holeNumber: 6, par: 3},
                { holeNumber: 7, par: 3},
                { holeNumber: 8, par: 4},
                { holeNumber: 9, par: 3},
                { holeNumber: 10, par: 3},
                { holeNumber: 11, par: 4},
                { holeNumber: 12, par: 4},
                { holeNumber: 13, par: 4},
                { holeNumber: 14, par: 3},
                { holeNumber: 15, par: 3},
                { holeNumber: 16, par: 3},
                { holeNumber: 17, par: 2},
                { holeNumber: 18, par: 3},
            ],
            totalPar: 60,
            color: 'rgba(0, 135, 0, 0.22)'
        });

        const course3 = await Course.create({
            courseName: 'Dream Land Challenge Course - Black',
            numberOfHoles: 18,
            holes: [
              { holeNumber: 1, par: 5},
              { holeNumber: 2, par: 5},
              { holeNumber: 3, par: 3},
              { holeNumber: 4, par: 3},
              { holeNumber: 5, par: 3},
              { holeNumber: 6, par: 3},
              { holeNumber: 7, par: 3},
              { holeNumber: 8, par: 5},
              { holeNumber: 9, par: 3},
              { holeNumber: 10, par: 4},
              { holeNumber: 11, par: 4},
              { holeNumber: 12, par: 4},
              { holeNumber: 13, par: 5},
              { holeNumber: 14, par: 4},
              { holeNumber: 15, par: 4},
              { holeNumber: 16, par: 4},
              { holeNumber: 17, par: 3},
              { holeNumber: 18, par: 4},
            ],
            totalPar: 69,
            color: 'rgba(0, 0, 0, 0.22)'
        });

        // Create Games
        const game1 = await Game.create({
            course: course1._id,
            players: [
                {
                    name: user1.firstName + ' ' + user1.lastName,
                    scores: [
                        { holeNumber: 1, playerPar: 4 },
                        { holeNumber: 2, playerPar: 3 },
                        { holeNumber: 3, playerPar: 3},
                        { holeNumber: 4, playerPar: 2},
                        { holeNumber: 5, playerPar: 5},
                        { holeNumber: 6, playerPar: 3},
                        { holeNumber: 7, playerPar: 4},
                        { holeNumber: 8, playerPar: 3},
                        { holeNumber: 9, playerPar: 3},
                        { holeNumber: 10, playerPar: 2},
                        { holeNumber: 11, playerPar: 3},
                        { holeNumber: 12, playerPar: 5},
                        { holeNumber: 13, playerPar: 4},
                        { holeNumber: 14, playerPar: 2},
                        { holeNumber: 15, playerPar: 3},
                        { holeNumber: 16, playerPar: 2},
                        { holeNumber: 17, playerPar: 2},
                        { holeNumber: 18, playerPar: 3},
                    ]
                },
                // Add more players as needed
            ]
        });

        // Assign courses and games to users
        user1.courses.push(course1._id, course2._id, course3._id);
        user1.games.push(game1._id); 
        user2.courses.push(course2._id, course3._id);
        user2.games.push(game1._id); 
        await Promise.all([user1.save(), user2.save()]);

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
});
