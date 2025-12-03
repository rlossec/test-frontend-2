// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Layout } from "./layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { toolRoutes } from "./routes/tool";
import { analyticsRoutes } from "./routes/analytics";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {toolRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
            {analyticsRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
export default App;
