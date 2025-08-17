import React from 'react';
import './_checkbox.scss';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className='custom-checkbox'>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className='custom-checkbox__input'
      />
      <span className='custom-checkbox__box'>
        {checked && (
          <svg viewBox='0 0 24 24' className='custom-checkbox__check'>
            <path fill='white' d='M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.4-1.4z' />
          </svg>
        )}
      </span>
      {label && <span className='custom-checkbox__label'>{label}</span>}
    </label>
  );
};

export default Checkbox;
