import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-full bg-[#00B39F] text-white">
        <div className="absolute top-[55%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <h1 className="text-6xl font-bold mb-4">LinkPocket</h1>
            <p className="mt-2 text-2xl">子供を守る、安心をポケットに。</p>
        </div>
    </div>
  );
};

export default SplashScreen;
