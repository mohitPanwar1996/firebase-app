import { BrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider, useFirebaseAuth } from "./hooks/useFirebaseAuth";
import { appRouter } from "./AppRouter";

function App() {
  const { user, loading }: any = useFirebaseAuth();

  console.log(user);

  // if (!user && loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <BrowserRouter>
    //   {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    // </BrowserRouter>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}
export default App;
