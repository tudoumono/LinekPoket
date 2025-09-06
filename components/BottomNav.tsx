import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: 'home' as const, label: 'ホーム' },
    { to: '/alerts', icon: 'list' as const, label: 'アラート' },
    { to: '/profile', icon: 'user' as const, label: '子供' },
    { to: '/settings', icon: 'settings' as const, label: '設定' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex justify-around items-center">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 rounded-lg ${
              isActive ? 'text-[#1F56C2]' : 'text-gray-500'
            }`
          }
          aria-label={`${item.label}画面に移動`}
        >
          <Icon name={item.icon} className="w-7 h-7" />
          <span className="text-xs font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;