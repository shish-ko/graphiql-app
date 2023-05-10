import React from 'react';
import logo from '../../public/GraphQL_Logo.png';

export const Logo: React.FC = () => {
  return <img src={logo} alt="Logo" style={{ alignSelf: 'end', maxWidth: '50px' }} />;
};
