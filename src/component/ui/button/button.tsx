import React, { forwardRef, ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';
import s from './button.module.scss';

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  variant?: 'primary' | 'secondary';
} & ComponentPropsWithoutRef<T>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as: Component = 'button', className, variant = 'primary', ...rest }, ref) => {
    return <Component ref={ref} className={clsx(s.button, s[variant], className)} {...rest} />;
  }
);

Button.displayName = 'Button';
