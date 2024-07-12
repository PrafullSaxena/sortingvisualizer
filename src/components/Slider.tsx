import { useEffect, useState } from 'react';

type SliderProps = {
  defaultValue: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  width?: number;
};

const Slider = ({ width, disabled = false, ...props }: SliderProps) => {
  const [wd, setWd] = useState('100%');

  useEffect(() => {
    if (width) {
      setWd(`${width}px`);
    }
  }, [width]);

  return (
    <input
      type='range'
      style={{
        width: `${wd}`,
        border: '1px solid red',
      }}
      defaultValue={props.defaultValue}
      min={props.min}
      max={props.max}
      disabled={disabled}
      onChange={(e) => props.onChange(Number(e.target.value))}
    />
  );
};

export default Slider;
