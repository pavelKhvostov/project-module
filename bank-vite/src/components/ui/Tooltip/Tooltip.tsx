import React, { useState } from 'react';
import './_tooltip.scss';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`tooltip tooltip--${position}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className='tooltip__content'>{text}</div>}
    </div>
  );
};

export default Tooltip;
