import React from 'react';
import { MagnifyingGlass, TrashSimple } from '@phosphor-icons/react';
import { HistoryItem } from '../../types/weather';

interface HistoryItemRowProps {
  item: HistoryItem;
  onClick: (item: HistoryItem) => void;
  onDelete: (name: string) => void;
}

const HistoryItemRow: React.FC<HistoryItemRowProps> = ({ item, onClick, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-1 sm:p-2">
      <span className="flex-1 text-sm sm:text-base mb-1 sm:mb-0">{item.name}</span>
      <div className="flex gap-1 sm:gap-2">
        <button
          onClick={() => onClick(item)}
          className="aspect-square p-1 sm:p-2 bg-gray-100 text-black rounded-md hover:bg-gray-200"
        >
          <MagnifyingGlass weight="bold" size={16} />
        </button>
        <button
          onClick={() => onDelete(item.name)}
          className="aspect-square p-1 sm:p-2 bg-gray-100 text-black rounded-md hover:bg-gray-200"
        >
          <TrashSimple weight="bold" size={16} />
        </button>
      </div>
    </li>
  );
};

export default HistoryItemRow;