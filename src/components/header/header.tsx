import React, { ReactNode } from 'react';

/* 
Header consists of:
   title - e.g Parallel/ User/ Channel
   action button - e.g. Edit Channel button
   action info - e.g. GRID (Info / Share / Connect)
*/

interface IHeader  {
  title?: ReactNode;
  action?: ReactNode;
  info?: ReactNode;
}

const Header = ({title, action, info}: IHeader) => { 

  return (
    <div>
    <div>{title}</div>
    <div>{action}</div>
    <div>{info}</div>
    </div>
  )
}

export default Header;