require('dotenv').config();
const Game = require('../models/Game');
const Course = require('../models/Course');
const User = require('../models/User');
const { authMiddleware } = require('../utils/authMiddleware');
const jwt = require('jsonwebtoken');

exports.getPastGames = async (req, res) => {
  try {
    const { _id } = req.user;

    const games = await Game.find({ user: _id });

    return res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOneGame = async (req, res) => {
    try {
        const game_id = req.params.game_id;
        const loggedInUserId = req.user.id;

        const game = await Game.findOne({ id: game_id, user: loggedInUserId });

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        return res.status(200).json({ game });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

exports.saveGame = async (req, res) => {
  try {
    const { course, players } = req.body;

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

    const newGame = new Game({
      course,
      players,
      user: loggedInUserId
    });

    await newGame.save();

    res.status(200).json({ message: 'Game successfully saved:', game: newGame} );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// {
//     "course": "60d488f1a63eae0034f88c54", // ObjectId of the course
//     "players": [
//       {
//         "name": "Player 1",
//         "score": [
//           { "holeNumber": 1, "playerPar": 3 },
//           { "holeNumber": 2, "playerPar": 4 },
//           // Add scores for other holes as needed
//         ]
//       },
//       // Add more players as needed
//     ]
//   }
  
exports.deletePastGame = async (req, res) => {
    try {
        const game_id = req.params.game_id;
        const loggedInUserId = req.user.id;

        const deletedGame = await Game.findOneAndDelete({ id: game_id, user: loggedInUserId });

        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        return res.status(200).json({ message: 'Game successfully deleted'});
    } catch (error) {
        console.error('Error deleting Course');
        return res.status(500).json({ message: 'Internal server error'});
    }
};