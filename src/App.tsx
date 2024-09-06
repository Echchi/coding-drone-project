import { RouterProvider } from "react-router-dom";
import Router from "./app/hocs/router/Router.tsx";

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
