interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    placeholder?: string;
    className?: string;
    helperText?:string
}

export default function InputField({
                                       id,
                                       label,
                                       type = 'text',
                                       value,
                                       onChange,
                                       error,
                                       placeholder,
                                       helperText,
                                       className = '',
                                   }: InputFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium mb-1 text-right">{label}</label>
            <input
                id={id}
                name={id}
                type={type??'text'}
                value={value}
                onChange={onChange}
                aria-describedby={error ? `${id}-error` : ''}
                placeholder={placeholder??''}
                className={`w-full px-4 py-2 border rounded-lg text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${error ? 'border-red-500' : ''} ${className}`}
            />
            {error &&helperText&& (
                <p id={`${id}-error`} className="text-xs text-red-500 text-right mt-1">
                    {helperText}
                </p>
            )}
        </div>
    );
}
