const express = require('express');
const userController = require('../controllers/userController');
const courseController = require('../controllers/courseController');
const gameController = require('../controllers/gameController');
const { authMiddleware } = require('../utils/authMiddleware');

const router = express.Router();

// Users
router.get('/', userController.getAllUsers);
router.post('/login', authMiddleware, userController.login);
router.post('/signup', userController.signup);

// Courses
router.get('/courses', authMiddleware, courseController.getAllCourses);
router.get('/courses/:courseName', authMiddleware, courseController.getOneCourse);
router.post('/courses', authMiddleware, courseController.addACourse);
router.delete('/courses/:courseName', authMiddleware, courseController.deleteACourse);

// Games
router.get('/games', authMiddleware, gameController.getPastGames);
router.get('/games/:gameId', authMiddleware, gameController.getOneGame);
router.post('/games', authMiddleware, gameController.saveGame);
router.delete('/games/:gameId', authMiddleware, gameController.deletePastGame);

module.exports = router;