import React, { useState, useEffect, forwardRef } from 'react';
import { Input } from './ui/input';

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value, onChange, placeholder, className }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      // Format the value for display
      const numericValue = value.replace(/[^\d]/g, '');
      const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setDisplayValue(formatted);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/[^\d,]/g, '');
      // Remove commas for storage
      const numericValue = inputValue.replace(/,/g, '');
      onChange(numericValue);
    };

    return (
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        ref={ref}
      />
    );
  }
);

PriceInput.displayName = 'PriceInput';