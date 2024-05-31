import express from 'express';
import { getReports } from './reportsController.js';

export default function reportRoutes() {
	const router = express.Router();
	
    //Step 4: Get User Details(name, role, permissions)
    router.get('/reports', getReports)

	return router;
}
