type ComplexityViewerProps = {
  title: string;
  best: string;
  average: string;
  worst: string;
};

function convertToSuperScript(str: string) {
  return str.replace(/O\(n\^(\d)\)/g, (match, p1) => {
    return `O(n<sup>${p1}</sup>)`;
  });
}

const ComplexityViewer = ({
  title,
  best,
  average,
  worst,
}: ComplexityViewerProps) => {
  best = convertToSuperScript(best);
  average = convertToSuperScript(average);
  worst = convertToSuperScript(worst);

  const style: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      width: '100%',
      textAlign: 'center',
      textDecoration: '.5px underline',
      fontSize: '1.5rem',
      fontWeight: '400',
      paddingBottom: '10px',
      borderBottom: '.5px outset gray',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: `1fr 1fr`,
      gap: '0',
      borderBottom: '.5px outset gray',
      alignItems: 'center',
      //   width: '60%',
    },
    leftCell: {
      height: '25px',
      textAlign: 'right',
      padding: '8px',
      borderBottom: '.5px outset gray',
      borderRight: '.5px outset gray',
    },
    rightCell: {
      height: '25px',
      padding: '8px',
      textAlign: 'left',
      //   fontSize: '18px',
      borderBottom: '.5px outset gray',
    },
  };

  return (
    <div style={style.container}>
      <div style={style.title}>{title}</div>
      <div style={style.grid}>
        <div style={style.leftCell}>Best Case</div>
        <div style={style.rightCell}>
          <div dangerouslySetInnerHTML={{ __html: best }} />
        </div>
        <div style={style.leftCell}>Avg Case</div>
        <div style={style.rightCell}>
          <div dangerouslySetInnerHTML={{ __html: average }} />
        </div>
        <div style={style.leftCell}>Worse Case</div>
        <div style={style.rightCell}>
          <div dangerouslySetInnerHTML={{ __html: worst }} />
        </div>
      </div>
    </div>
  );
};

export default ComplexityViewer;
