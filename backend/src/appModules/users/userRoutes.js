import express from 'express';
import { createPermission, createRole, createUser, getPermissions, getRoles, getUserDetails, getUsers } from './userController.js';

export default function userRoutes() {
	const router = express.Router();
	
    //Step 1: Create Permissions Constants
	router.get('/getPermissions', getPermissions); 
    router.post('/createPermission', createPermission); 

    //Step 2: Create Role with Permissions
    router.get('/getRoles', getRoles); 
	router.post('/createRole', createRole); 
    // router.get('/assignPermissionToRole', assignPermissionToRole)

    //Step 3: Create User with Role
	router.get('/getUsers', getUsers); 
    router.post('/createUser', createUser);
    // router.post('/assignRoleToUser', assignRoleToUser)


    //Step 4: Get User Details(name, role, permissions)
    router.get('/getUserDetails', getUserDetails)

	return router;
}
