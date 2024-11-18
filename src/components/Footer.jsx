import React from "react";
import border_FQP from "../../res/border_FQP.svg";

const Footer = () => {
  return (
    <footer className="w-full h-16">
      <div className="relative w-full h-full overflow-hidden">
        <img src={border_FQP} alt="border" className="w-full h-full object-cover" />
      </div>
    </footer>
  );
};

export default Footer;