import * as React from 'react';
import { Label } from '@/components/atoms/Label/Label';
import { Input } from '@/components/atoms/Input/Input';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  required = false,
  className,
  inputProps,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-tertiary-error ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={required}
        required={required}
        className={error ? 'border-tertiary-error focus-visible:ring-tertiary-error' : ''}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-tertiary-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
