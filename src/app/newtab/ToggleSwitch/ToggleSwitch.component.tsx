import React from 'react'
import ToggleSwitchElement from './ToggleSwitchElement.component';

interface ToggleSwitchProps {
  defaultName: string;
  optionName: string;
  onChange?: (selectedName: any) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  defaultName,
  optionName,
  onChange = () => {},
}) => {
  const defaultState = [
    { id: 0, name: defaultName, isSelected: true },
    { id: 1, name: optionName, isSelected: false },
  ];
  const oppositeState = [
    { id: 0, name: defaultName, isSelected: false },
    { id: 1, name: optionName, isSelected: true },
  ];
  const [state, setState] = React.useState(defaultState);
  const [currentActive, setCurrentActive] = React.useState(false); //0 => false, 1 => true

  const eleClickHandler = (id: number) => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!!id === currentActive) {
        //do nothing
      } else {
        setCurrentActive(!currentActive);
        setState(!currentActive ? oppositeState : defaultState);
        onChange(!currentActive ? optionName : defaultName);
      }
      // console.log('Parent click handler. Element: ', id)
    };
  };

  return (
    <div className="w-auto flex flex-row border-2 border-transparent box-border rounded-3xl bg-blue-900">
      {state.map((x) => {
        return (
          <ToggleSwitchElement
            key={x.name}
            name={x.name}
            isSelected={x.isSelected}
            _onClick={eleClickHandler(x.id)}
          />
        );
      })}
    </div>
  );
};

export default ToggleSwitch
