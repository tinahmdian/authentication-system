'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import google from '@/assets/icons/google.svg';
import facebook from '@/assets/icons/facebook.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alerts from '@/components/ui/Alerts';
import InputField from '@/components/ui/InputField';
import PasswordToggleInput from '@/components/ui/PasswordToggleInput';
import Button from '@/components/ui/Button';
import DropzoneUpload from '@/components/ui/DropzoneUpload';
import AuthLayout from "@/components/AuthLayout";

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState<'success'|'error'|'info'|'warning'>('success');
const validationSchema = Yup.object({
        name: Yup.string().required('نام الزامی است'),
        email: Yup.string().trim().email('ایمیل معتبر نیست').notRequired(),
        phone: Yup.string().matches(/^09\d{9}$/, 'شماره باید با 09 شروع شود و 11 رقم باشد').required('شماره تماس الزامی است'),
        password: Yup.string()
            .required('رمز عبور الزامی است')
            .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
            .matches(
                /(?=.*[a-z])/,
                'رمز عبور باید حداقل یک حرف کوچک داشته باشد'
            )
            .matches(
                /(?=.*[A-Z])/,
                'رمز عبور باید حداقل یک حرف بزرگ داشته باشد'
            )
            .matches(
                /(?=.*[0-9])/,
                'رمز عبور باید حداقل یک عدد داشته باشد'
            )
    });
    const formik = useFormik({
        initialValues: { name: '', email: '', phone: '', password: '', avatar: '' },
        validationSchema,
        onSubmit: (values) => {
            try {
                setLoading(true);
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push(values);
                localStorage.setItem('users', JSON.stringify(users));
                setAlertMessage('ثبت نام با موفقیت انجام شد!');
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            }
            catch {
                setAlertMessage(' مشکلی در ثبت نام شما پیش آمده لطفا مجددا تلاش کنید .');
                setTypeMessage('error')
            }

        },
    });
    return (
        <>
            <AuthLayout type="signup">
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center mb-6">ثبت نام</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4" aria-label="فرم ثبت نام">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                id="email"
                                label="ایمیل"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email&&formik.errors.email?formik.errors.email:''}
                                placeholder="you@example.com"
                            />
                            <InputField
                                id="name"
                                label="نام و نام خانوادگی"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name?formik.errors.name:''}
                                placeholder="مثال: علی رضایی"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <PasswordToggleInput
                                id="password"
                                label="رمز عبور"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password?formik.errors.password:''}
                                placeholder="********"
                            />
                            <InputField
                                id="phone"
                                label="شماره تماس"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone?formik.errors.phone:''}
                                placeholder="مثال: 09123456789"
                            />
                        </div>
                        <DropzoneUpload  value={formik.values.avatar} onChange={(base64) => formik.setFieldValue('avatar', base64)} />
                        <Button type="submit" variant="solid" size="md" disabled={loading} >
                            {loading ? 'در حال پردازش  ' : 'ثبت نام'}
                        </Button>
                    </form>
                    <div className="mt-6 flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-3 text-gray-500 text-sm">ادامه با</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="flex justify-center gap-4 mt-4">

                        <Button type={'button'} variant="outline" size="sm" ariaLabel="ورود با گوگل" >
                            <Image src={google} alt="Google" className="w-5 h-5" />
                            <p className={'text-purple-800  font-normal'}>گوگل</p>
                        </Button>
                        <Button variant="outline" size="sm" type={'button'} ariaLabel="ورود با فیس‌بوک">
                            <Image src={facebook} alt="Facebook" className="w-5 h-5" />
                            <p className={'text-purple-800 font-normal'}>فیس‌بوک</p>
                        </Button>
                    </div>

                    <p className="text-sm mt-6 text-center">
                        حساب کاربری دارید؟{' '}
                        <a href="/login" className="text-purple-600 hover:underline">
                            ورود
                        </a>
                    </p>
                </div>
            </AuthLayout>
            {alertMessage!=='' && <Alerts message={alertMessage} typeMessage={typeMessage} setMessage={setAlertMessage} />}
            </>
    );
}
