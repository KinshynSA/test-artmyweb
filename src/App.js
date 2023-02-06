import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home, Users, Edit } from "./routes";
import urls from "./constants/urls";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';



const router = createBrowserRouter([
  {
    path: urls.urlHome,
    element: <Home />,
  },
  {
    path: urls.urlUsers,
    element: <Users />,
  },
  {
    path: `${urls.urlEdit}/:userId`,
    element: <Edit />,
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
