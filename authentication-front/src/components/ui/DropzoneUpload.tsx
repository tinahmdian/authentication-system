import { useDropzone } from 'react-dropzone';
import Image from "next/image";
interface DropzoneUploadProps {
    value: string;
    onChange: (base64: string) => void;
}

export default function DropzoneUpload({ value, onChange }: DropzoneUploadProps) {
       const onDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (err) => reject(err);
            });
            onChange(base64);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    return (
        <div>
            <label className="block text-sm font-medium mb-1 text-right">آپلود عکس پروفایل</label>
            {!value ? (
                <div
                    {...getRootProps()}
                    className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-purple-600">فایل را رها کنید...</p>
                    ) : (
                        <p className="text-gray-500">برای انتخاب یا کشیدن فایل کلیک کنید</p>
                    )}
                </div>
            ) : (
                <div className="relative w-[110px] h-[70px] mx-auto my-1">
                    <Image
                        src={value}
                        alt="Avatar Preview"
                        fill
                        className="rounded-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 cursor-pointer"
                        aria-label="حذف عکس"
                    >
                        x
                    </button>
                </div>
            )}
        </div>
    );
}
