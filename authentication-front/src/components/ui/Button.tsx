import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'solid' | 'outline';
    size?: 'sm' | 'md';
    ariaLabel?: string;
    loading?: boolean;
}
export default function Button({
                                   children,
                                   onClick,
                                   type ,
                                   disabled = false,
                                   variant = 'solid',
                                   size = 'md',
                                   ariaLabel,
                                   loading = false,
                               }: ButtonProps) {
    const classes = clsx(
        'font-semibold cursor-pointer w-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors flex items-center  gap-2',
        {
            'bg-purple-600 text-white hover:bg-purple-700 justify-center disabled:opacity-50': variant === 'solid',
            'border border-purple-600 text-purple-800 bg-transparent flex justify-between hover:bg-purple-50 disabled:opacity-50 ': variant === 'outline',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
        }
    );

    return (
        <button
            type={type}
            onClick={onClick as MouseEventHandler<HTMLButtonElement>}
            disabled={disabled ??false}
            aria-label={ariaLabel??''}
            aria-busy={loading??false}
            className={classes}
        >
            {loading ? 'در حال پردازش...' : children}
        </button>
    );
}
