import React from 'react';

type IconName = 'shield-alert' | 'alert-triangle' | 'info' | 'chevron-left' | 'home' | 'bell' | 'list' | 'user' | 'eye' | 'message-circle' | 'settings' | 'link-pocket-logo' | 'plus' | 'trash-2' | 'x' | 'phone';

interface IconProps {
  name: IconName;
  className?: string;
}

const ICONS: Record<IconName, React.FC<{ className?: string }>> = {
  'shield-alert': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
  ),
  'alert-triangle': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
  ),
  'info': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ),
  'chevron-left': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
  ),
  'home': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  'bell': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  ),
  'list': ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
  ),
  'user': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  'eye': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  'message-circle': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
  ),
  'settings': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  'link-pocket-logo': ({ className }) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" aria-hidden="true">
      <path d="M50.1,44.9c3.5,0,6.3,2.8,6.3,6.3c0,0.8-0.1,1.5-0.4,2.2c2.7,1.4,4.5,4.2,4.5,7.5c0,0,0,0,0,0.1 v0.1c-1.8-0.5-3.6-0.8-5.5-1c-0.8,2.7-3.2,4.7-6.1,4.7c-3,0-5.5-2.1-6.2-4.8c-1.5-0.3-2.9-0.5-4.3-0.7 c-1.4,2.8-4.2,4.8-7.5,4.8c-3.6,0-6.6-2.4-7.4-5.6c-1.7,0.2-3.4,0.5-5.1,0.8v-0.1c0-3.6,2.2-6.7,5.3-8.2 c-0.3-0.7-0.5-1.5-0.5-2.3c0-3.5,2.8-6.3,6.3-6.3c2.3,0,4.2,1.2,5.4,3c1.1-2.2,3.4-3.7,6-3.7 C46.7,44.9,48.5,45.7,50.1,44.9z M29.5,51.2c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1 C32.6,52.6,31.2,51.2,29.5,51.2z M44.6,51.2c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1 C47.7,52.6,46.3,51.2,44.6,51.2z M81.5,70.1c0.8-2.1-0.2-4.6-2.2-5.9c-0.1,0-0.1-0.1-0.2-0.1c-9.8-5.3-19.6-5.3-29.3,0 c-1.1,0.6-2.4,0.6-3.5,0c-9.8-5.3-19.6-5.3-29.3,0c-0.1,0-0.1,0.1-0.2,0.1c-2,1.3-3,3.8-2.2,5.9c0.6,1.5,2.1,2.6,3.8,2.7 c0.4,0,0.8,0,1.2,0c2,0,4-0.2,5.9-0.5c3.2-0.5,6.2-1.5,8.8-2.8c2.4-1.2,4.5-2.8,6.2-4.5c1.4,1.8,3.2,3.4,5.4,4.5 c2.6,1.3,5.6,2.3,8.8,2.8c1.9,0.3,3.9,0.5,5.9,0.5c0.4,0,0.8,0,1.2,0C79.4,72.7,80.9,71.7,81.5,70.1z M53.4,20.8 c-4.4-4.4-11.6-4.4-16,0c-4.4,4.4-4.4,11.6,0,16c1.8,1.8,4.1,2.7,6.5,2.7c-0.1-0.5-0.2-1-0.2-1.5c0-4.1,3.3-7.4,7.4-7.4 c0.5,0,1,0.1,1.5,0.2c0.9-2.2,2.7-4.1,4.9-5.3C56.1,23.7,54.8,22.2,53.4,20.8z M63.3,27.1c-2.8,0-5.1,2.3-5.1,5.1 c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1C68.4,29.4,66.1,27.1,63.3,27.1z"/>
    </svg>
  ),
  'plus': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  'trash-2': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  'x': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  'phone': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
};

// Fix: Add the Icon component implementation and a default export.
const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = ICONS[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent className={className} />;
};

export default Icon;
