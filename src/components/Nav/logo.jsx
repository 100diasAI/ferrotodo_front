import React from 'react';

const Logo = ({ theme }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" className={theme === 'dark' ? 'dark-logo' : 'light-logo'} style={{ width: '100%', height: '100%', maxWidth: '300px' }}>
    <style>
      {`
        .text { font-family: 'Arial', sans-serif; font-weight: bold; font-size: 32px; }
        .icon { fill: currentColor; }
        .light { fill: #333; }
        .dark { fill: #fff; }
      `}
    </style>
    
    
    <g className="icon" transform="translate(20, 15)">
      
      <path d="M5 35 L15 25 L10 20 L20 10 L25 15 L15 25 L25 35 L20 40 L10 30 Z" className={theme === 'dark' ? 'dark' : 'light'} />
      <rect x="9" y="28" width="30" height="5" transform="rotate(45 20,35)" className={theme === 'dark' ? 'dark' : 'light'} />
  
      
      <path d="M35 35 L25 25 L30 20 L20 10 L15 15 L25 25 L15 35 L20 40 L30 30 Z" className={theme === 'dark' ? 'dark' : 'light'} />
      <rect x="24" y="23" width="30" height="5" transform="rotate(-45 25,35)" className={theme === 'dark' ? 'dark' : 'light'} />
    </g>
  
    
    <text x="80" y="60" className={theme === 'dark' ? 'text dark' : 'text light'}>
      Ferretodo
    </text>
  </svg>
  

  );
};

export default Logo;
