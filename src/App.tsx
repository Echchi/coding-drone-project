import { RouterProvider } from "react-router-dom";
import Router from "./app/hocs/router/Router.tsx";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LectureProvider } from "./shared/context/lectureProvider.tsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <LectureProvider>
          <RouterProvider router={Router} />
        </LectureProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
