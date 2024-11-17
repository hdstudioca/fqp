import React from 'react';
import border_FQP from '../../res/border_FQP.svg'; 
import client_logo from '../../res/client_logo.svg'; 

const Header = () => {
    return (
        <header className="relative w-full text-center">
            <div className="relative w-full overflow-hidden max-h-32 border-b-4 border-black">
                <img src={border_FQP} alt="border" className="w-full h-full object-cover" />
                <img src={client_logo} alt="cleint logo" className="absolute top-[-10px] left-5 w-128 h-28 object-contain m-4" />
                <div className="absolute inset-y-4 top-12 right-10 flex max-w-xs p-2.5 bg-black bg-opacity-75 rounded-xl font-golos font-bold">
                    <h1 className="text-white text-4xl">
                    Fence Quote <span className="text-orange-500">Pro</span>
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
