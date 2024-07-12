type LineBreakProps = {
  width?: number;
  height?: number;
  color?: string;
};

const LineBreak = ({
  width = 100,
  height = 1,
  color = 'black',
}: LineBreakProps) => {
  return (
    <div
      style={{
        width: `${width}%`,
        height: `${height}px`,
        background: `${color}`,
      }}
    ></div>
  );
};

export default LineBreak;
