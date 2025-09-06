import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  'aria-label': string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, 'aria-label': ariaLabel }) => {
  const handleClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent the parent container's onClick from firing
    e.stopPropagation();
    onChange(!enabled);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B39F]`}
      style={{ backgroundColor: enabled ? '#00B39F' : '#D1D5DB' }}
      aria-checked={enabled}
      aria-label={ariaLabel}
      role="switch"
    >
      <span
        aria-hidden="true"
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
        style={{ transform: enabled ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  );
};

export default ToggleSwitch;