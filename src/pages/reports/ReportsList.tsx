import { Link } from "react-router-dom";

const reports = [
  {
    name: "Report 1",
    permissionName: "REPORTS_REPORT1_VIEW",
  },
  {
    name: "Report 2",
    permissionName: "REPORTS_REPORT2_VIEW",
  },
  {
    name: "Report 3",
    permissionName: "REPORTS_REPORT3_VIEW",
  },
];

const userPermissions = [
  "REPORTS_REPORT1_VIEW",
  "REPORTS_REPORT2_VIEW",
  "REPORTS_REPORT3_VIEW",
];

export default function ReportsList() {
  return (
    <main className="container mx-auto my-8">
      <div className="flex">
        {reports.map((report, index) => {
          return (
            <>
              {userPermissions.includes(report.permissionName) ? (
                <div
                  key={index}
                  className="flex justify-between mb-4 bg-gray-200 m-4 p-5"
                >
                  <Link to={`/reports/${report.name}`}>
                    <h2 className="text-lg">{report.name}</h2>
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
    </main>
  );
}
