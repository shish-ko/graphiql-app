import React from 'react';
import { Outlet } from 'react-router-dom';
import { MyButton } from '~compos/UI/AppButton';
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
      <MyButton disabled={true}>Custom btn example</MyButton>
    </div>
  );
};
