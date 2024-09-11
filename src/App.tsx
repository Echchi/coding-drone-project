import { RouterProvider } from "react-router-dom";
import Router from "./app/hocs/router/Router.tsx";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={Router} />
    </RecoilRoot>
  );
}

export default App;
