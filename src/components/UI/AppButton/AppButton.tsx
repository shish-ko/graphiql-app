import React, { ReactNode } from 'react';
import style from './appButtonStyle.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const AppButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button {...props} className={style.appBtn}>
      {props.children}
    </button>
  );
};
