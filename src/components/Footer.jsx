import React from 'react';
import border_FQP from '../../res/border_FQP.svg';

const Footer = () => {
    return (
        <header className="fixed bottom-0 w-full "> 
        <div className="relative w-full overflow-hidden max-h-16"> 
            <img src={border_FQP} alt="border" className="w-full h-full object-cover " /> 
            </div> 
            </header>
    );
};

export default Footer;