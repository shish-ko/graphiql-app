import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppButton } from '~compos/UI/AppButton/AppButton';
import { useAppSelector } from '~utils/userHooks';

export const DefaultUi: React.FC = () => {
  const { name } = useAppSelector((state) => state.user);

  return (
    <div className="default">
      <h1>
        ToDO: header <br /> redux store example:{' '}
        <span style={{ fontWeight: 100, textDecoration: 'underline' }}>{name}</span>
      </h1>
      <Outlet />
      <h1>ToDO: footer</h1>
      <AppButton disabled={true}>Custom btn example</AppButton>
    </div>
  );
};
