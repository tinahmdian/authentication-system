import { useState } from 'react';
import Image from 'next/image';
import view from '@/assets/icons/view.svg';
import viewOff from '@/assets/icons/viewOff.svg';

interface PasswordToggleInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?:string
    placeholder?: string;
}

export default function PasswordToggleInput({
                                                id,
                                                label,
                                                value,
                                                onChange,
                                                error,
                                                helperText,
                                                placeholder,
                                            }: PasswordToggleInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <label htmlFor={id} className="block text-sm font-medium mb-1 text-right">{label}</label>
            <input
                id={id}
                name={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                aria-describedby={error ? `${id}-error` : ''}
                placeholder={placeholder??''}
                className={`w-full px-4 py-2 border rounded-lg text-right pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${error ? 'border-red-500' : ''}`}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-9.5 text-gray-500 cursor-pointer"
                aria-label={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
            >
                {showPassword ? <Image src={viewOff} alt="" width={18} /> : <Image src={view} alt="" width={18} />}
            </button>
            {error && (
                <p id={`${id}-error`} className="text-xs text-red-500 text-right mt-1">{helperText}</p>
            )}
        </div>
    );
}
