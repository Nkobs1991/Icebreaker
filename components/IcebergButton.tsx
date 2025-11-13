
import React from 'react';
import IcebergIcon from './icons/IcebergIcon';
import BrokenIcebergIcon from './icons/BrokenIcebergIcon';

interface IcebergButtonProps {
  onClick: () => void;
  isCoolingDown: boolean;
  isLoading: boolean;
  remainingTime: number;
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const IcebergButton: React.FC<IcebergButtonProps> = ({ onClick, isCoolingDown, isLoading, remainingTime }) => {
  const isDisabled = isCoolingDown || isLoading;

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      <button
        onClick={onClick}
        disabled={isDisabled}
        aria-label={isLoading ? "Loading new icebreaker" : isCoolingDown ? `Cooldown timer: ${formatTime(remainingTime)} remaining` : "Get a new icebreaker"}
        className={`
          group relative w-full h-full p-4 transition-transform duration-300 ease-in-out focus:outline-none
          ${isDisabled ? 'cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        `}
      >
        <div className={`transition-opacity duration-500 ${isCoolingDown ? 'opacity-30' : 'opacity-100'}`}>
          {isCoolingDown ? <BrokenIcebergIcon /> : <IcebergIcon />}
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full animate-pulse">
            <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {isCoolingDown && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-3xl md:text-4xl font-bold font-mono tracking-widest">{formatTime(remainingTime)}</div>
            <div className="text-sm mt-1 uppercase text-gray-300">Cooldown</div>
          </div>
        )}
      </button>
    </div>
  );
};

export default IcebergButton;
