import express from 'express';
import LeaderboardController from '../../controllers/LeaderboardController'

const apiRoutes = express.Router();

apiRoutes.get('/leaderboard', LeaderboardController.getLeaderboardRank);

export default apiRoutes;
