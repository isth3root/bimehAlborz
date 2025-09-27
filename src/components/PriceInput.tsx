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
      // When the raw value changes from the parent, format it for display
      if (value === null || value === undefined) {
        setDisplayValue('');
        return;
      }
      // The value from the parent should be a clean string of digits
      const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setDisplayValue(formatted);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // On user input, strip all non-digit characters and send the raw number back to the parent
      const numericValue = e.target.value.replace(/[^\d]/g, '');
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