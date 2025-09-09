
'use client';

import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 text-center px-4">
            <h1 className="text-7xl font-extrabold text-purple-600">۴۰۴</h1>
            <p className="mt-4 text-lg text-gray-700">متأسفیم! صفحه‌ای که دنبالش هستید پیدا نشد</p>
            <Link
                href="/"
                className="mt-6 inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer"
                aria-label="بازگشت به صفحه اصلی"
            >
                بازگشت به صفحه اصلی
            </Link>
        </div>
    );
}
