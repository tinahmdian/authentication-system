'use client';

import Image from 'next/image';
import bg from '@/assets/images/76f63867-ff15-4e02-a36d-65a769a4b36a.jpg';
import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    type: 'login' | 'signup';
}

export default function AuthLayout({ children, type }: AuthLayoutProps) {
    const containerMaxWidth = type === 'signup' ? 'max-w-6xl' : 'max-w-4xl';
    const heading = type === 'signup' ? 'سلام خوش آمدید' : 'به حساب خود وارد شوید';
    const subheading =
        type === 'signup'
            ? 'برای ادامه ثبت نام کنید'
            : 'برای ادامه وارد حساب کاربری خود شوید';

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-100 bg-cover bg-center">
            <div className={`flex m-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden ${containerMaxWidth} w-full`}>
                <div className="hidden md:flex w-1/2 relative items-center justify-center text-white">
                    <Image src={bg} alt="welcome" fill className="object-cover" />
                    <div className="absolute bg-black/10 inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h2 className="text-2xl font-bold">{heading}</h2>
                        <p className="mt-2 text-sm">{subheading}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8">{children}</div>
            </div>
        </div>
    );
}
