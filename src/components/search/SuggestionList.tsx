import React from 'react';
import { Suggestion } from '../../types/weather';


interface SuggestionListProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-md z-10">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSelect(suggestion)}
          className="p-2 sm:p-3 hover:bg-gray-100 cursor-pointer font-sans rounded-lg text-sm sm:text-base"
        >
          {suggestion.display}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionList;