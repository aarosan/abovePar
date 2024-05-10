require('dotenv').config();
const Course = require('../models/Course');
const User = require('../models/User');
const { authMiddleware } = require('../utils/authMiddleware');
const jwt = require('jsonwebtoken');

exports.getAllCourses = async (req, res) => {
  try {
    const { _id } = req.user;

    const courses = await Course.find({ user: _id });

    return res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOneCourse = async (req, res) => {
    try {
        const courseName = req.params.courseName;
        const loggedInUserId = req.user.id;

        const course = await Course.findOne({ name: courseName, user: loggedInUserId });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({ course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

exports.addACourse = async (req, res) => {
  try {
    const { courseName, numberOfHoles, holes, totalPar, color } = req.body;

    console.log('req.headers.authorization',req.headers.authorization);

    const token = req.headers.authorization.split(' ')[1];

    console.log('COURSE CONTROLLER:', token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
        throw new Error('Failed to decode token');
    }

    console.log('decodedToken', decodedToken);
    console.log('decodedToken', decodedToken.data._id);


    const loggedInUserId = decodedToken.data._id;

    const newCourse = Course({
      courseName,
      numberOfHoles,
      holes,
      totalPar,
      color,
      user: loggedInUserId
    });

    await newCourse.save();

    res.status(200).json({ message: 'Course successfully created:', course: newCourse} );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteACourse = async (req, res) => {
    try {
        const courseName = req.params.courseName;
        const loggedInUserId = req.user.id;

        const deletedCourse = await Course.findOneAndDelete({ name: courseName, user: loggedInUserId });

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({ message: 'Course successfully deleted'});
    } catch (error) {
        console.error('Error deleting Course');
        return res.status(500).json({ message: 'Internal server error'});
    }
};