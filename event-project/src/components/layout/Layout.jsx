import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

