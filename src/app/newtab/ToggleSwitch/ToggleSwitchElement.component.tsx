import React from 'react'

interface ToggleSwitchElementProps {
  name?: string;
  isSelected?: boolean;
  _onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ToggleSwitchElement: React.FC<ToggleSwitchElementProps> = ({
  name,
  isSelected,
  _onClick,
}) => {
  const __onClick = _onClick
    ? _onClick
    : (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        console.log("No click handler passed!");
      };

  if (isSelected) {
    return (
      <div
        className="border-2 border-gray-100 box-border px-4 py-2 rounded-3xl text-blue-900 bg-gray-100 font-bold cursor-pointer"
        onClick={__onClick}
      >
        {name}
      </div>
    );
  }
  return (
    <div
      className="border-2 border-transparent box-border px-4 py-2 rounded-3xl text-gray-100 text-blue-500 cursor-pointer"
      onClick={__onClick}
    >
      {name}
    </div>
  );
};

export default ToggleSwitchElement