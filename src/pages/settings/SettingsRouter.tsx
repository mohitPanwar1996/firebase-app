import { Route, Routes } from 'react-router-dom';

import SettingsPage from './SettingsPage';
import UsersList from './UsersList';
import Roles from './RolesList';
import PermissionsTable from './PermissionsList';

export default function SettingsRouter(){
    return(
        <Routes>
            <Route path="/" element={<SettingsPage />} />
            <Route path="/users" element={<UsersList/>}/>
            <Route path="/roles" element={<Roles/>}/>
            <Route path="/permissions" element={<PermissionsTable/>}/>
        </Routes>
    )
}