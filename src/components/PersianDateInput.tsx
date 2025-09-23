import { useState } from 'react';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from 'lucide-react';

interface PersianDateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

type DayValue = {
  year: number;
  month: number;
  day: number;
} | null;

export function PersianDateInput({ value, onChange, placeholder, className }: PersianDateInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const parsePersianDate = (dateString: string): DayValue => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    return {
      year: parseInt(parts[0]),
      month: parseInt(parts[1]),
      day: parseInt(parts[2])
    };
  };

  const formatPersianDate = (date: DayValue): string => {
    if (!date) return '';
    return `${date.year}/${date.month.toString().padStart(2, '0')}/${date.day.toString().padStart(2, '0')}`;
  };

  const handleDateChange = (date: DayValue) => {
    const formatted = formatPersianDate(date);
    onChange(formatted);
    setIsOpen(false);
  };

  const selectedDate = parsePersianDate(value);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            type="text"
            value={value}
            placeholder={placeholder}
            className={className}
            readOnly
          />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          locale="fa"
          calendarClassName="bg-white border-0 shadow-none"
          shouldHighlightWeekends
          calendarPopperPosition="bottom"
        />
      </PopoverContent>
    </Popover>
  );
}