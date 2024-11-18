import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow bg-gray-100">
          Body here
        </div>
      </div>
      <Footer />
    </div>
  );
}