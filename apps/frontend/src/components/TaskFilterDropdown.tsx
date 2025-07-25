import { useState } from 'react';

const options = [
  { value: 'ALL', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'COMPLETED', label: 'Completed' },
];

interface TaskFilterDropdownProps {
  value: 'ALL' | 'PENDING' | 'COMPLETED';
  onChange: (value: 'ALL' | 'PENDING' | 'COMPLETED') => void;
}

export default function TaskFilterDropdown({ value, onChange }: TaskFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div className="relative inline-block text-left w-40">
      <button
        type="button"
        className="w-full px-4 py-2 bg-white/80 text-gray-700 font-semibold rounded-lg shadow hover:bg-white/90 border border-gray-200 flex items-center justify-between transition cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        <span>{selected?.label}</span>
        <svg className={`ml-2 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 animate-fade-in">
          {options.map(opt => (
            <button
              key={opt.value}
              className={`w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold ${value === opt.value ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
              onClick={() => { setOpen(false); onChange(opt.value as 'ALL' | 'PENDING' | 'COMPLETED'); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 