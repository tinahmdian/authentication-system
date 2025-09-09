'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// icons
import google from '@/assets/icons/google.svg';
import facebook from '@/assets/icons/facebook.svg';
// components
import InputField from '@/components/ui/InputField';
import PasswordToggleInput from '@/components/ui/PasswordToggleInput';
import Button from '@/components/ui/Button';
import Alerts from '@/components/ui/Alerts';
import AuthLayout from "@/components/AuthLayout";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState<'success' | 'error'>('success');

    const validationSchema = Yup.object({
        phone: Yup.string()
            .matches(/^09\d{9}$/, 'شماره باید با 09 شروع شود و 11 رقم باشد')
            .required('شماره تماس الزامی است'),
        password: Yup.string().required('رمز عبور الزامی است'),
    });

    const formik = useFormik({
        initialValues: { phone: '', password: '' },
        validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(
                    (u: any) => u.phone === values.phone && u.password === values.password
                );
                if (!user) {
                    setTypeMessage('error');
                    setAlertMessage('شماره یا رمز عبور اشتباه است');
                } else {
                    localStorage.setItem('activeUser', JSON.stringify(user));
                    setTypeMessage('success');
                    setAlertMessage('شما با موفقیت وارد شدید');
                    setTimeout(()=>{  router.push('/');},2000)
                }
            } catch {
                setAlertMessage('مشکلی در ورود شما پیش آمده، لطفا مجددا تلاش کنید.');
                setTypeMessage('error');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>
            <AuthLayout type="login">
                <div>
                    <h2 className="text-3xl font-bold text-center mb-6">ورود</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4" aria-label="فرم ورود">
                        <InputField
                            id="phone"
                            label="شماره تماس"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone ? formik.errors.phone : ''}
                            placeholder="مثال: 09123456789"
                        />
                        <PasswordToggleInput
                            id="password"
                            label="رمز عبور"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password ? formik.errors.password : ''}
                            placeholder="********"
                        />
                        <a
                            href="#"
                            className="block mt-1 text-xs text-purple-600 hover:underline text-right"
                        >
                            رمز عبور خود را فراموش کرده‌اید؟
                        </a>
                        <Button
                            type="submit"
                            variant="solid"
                            size="md"
                            disabled={loading}
                            loading={loading}
                            ariaLabel="دکمه ورود">
                            ورود
                        </Button>
                    </form>
                    <div className="mt-6 flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-3 text-gray-500 text-sm">ادامه با</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <Button type="button" variant="outline" size="sm" ariaLabel="ورود با گوگل">
                            <Image src={google} alt="Google" className="w-5 h-5" />
                            گوگل
                        </Button>
                        <Button type="button" variant="outline" size="sm" ariaLabel="ورود با فیس‌بوک">
                            <Image src={facebook} alt="Facebook" className="w-5 h-5" />
                            فیس‌بوک
                        </Button>
                    </div>
                    <p className="text-sm mt-6 text-center">
                        حساب کاربری ندارید؟{' '}
                        <a href="/signup" className="text-purple-600 hover:underline">
                            ثبت نام
                        </a>
                    </p>
                </div>
            </AuthLayout>
            {alertMessage!=='' && (
                <Alerts
                    message={alertMessage}
                    typeMessage={typeMessage}
                    setMessage={setAlertMessage}
                />
            )}
        </>
    );
}
