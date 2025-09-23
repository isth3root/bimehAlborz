import { InputDatePicker } from 'jalaali-react-date-picker';
import moment from 'moment-jalaali';
import { Calendar } from 'lucide-react';

interface PersianDateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function PersianDateInput({ value, onChange, placeholder, className }: PersianDateInputProps) {
  const handleDateChange = (unix: number) => {
    const formatted = moment.unix(unix).format('jYYYY/jMM/jDD');
    onChange(formatted);
  };

  return (
    <div className="relative">
      <InputDatePicker
        value={value ? moment(value, 'jYYYY/jMM/jDD').unix() : undefined}
        onChange={handleDateChange}
        placeholder={placeholder}
        className={`${className} pr-10`}
        responsive
      />
      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
}