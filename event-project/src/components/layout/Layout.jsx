import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import {useLocation} from 'react-router-dom'

const Layout = ({ children }) => {
  let location = useLocation();
  const [detection, setDetection] = useState(true);

  function pathDetection() {
    let path = location.pathname;
    if (path === '/login') {
      setDetection(false);
    } else {
      setDetection(true);
    }
  }
  
  useEffect(() => {
    console.log(location.pathname);
    pathDetection();
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {detection && <Navbar />}
      <main className="flex-grow container-main">
        <div className="container mx-auto px-4 py-4">{children}</div>
      </main>
      {detection && <Footer />}
    </div>
  );
};

export default Layout;

