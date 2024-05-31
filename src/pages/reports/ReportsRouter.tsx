import { Route, Routes } from 'react-router-dom';

import ReportsList from './ReportsList';
import Report1 from './Report1';
import Report2 from './Report2';
import Report3 from './Report3';

export default function ReportsRouter(){
    return(
        <Routes>
          <Route path="/" element={<ReportsList />} />
          <Route path="/report1" element={<Report1 />} />
          <Route path="/report2" element={<Report2 />} />
          <Route path="/report3" element={<Report3 />} />
      </Routes>
    );
}
