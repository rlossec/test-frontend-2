import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="bg-background-alt text-text flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
