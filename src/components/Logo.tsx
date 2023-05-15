import React from 'react';
import logo from '/GraphQL_Logo.png';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to={'/'}>
      <img src={logo} alt="Logo" style={{ alignSelf: 'end', maxWidth: '50px' }} />
    </Link>
  );
};
