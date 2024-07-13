import ComplexityViewer from '../components/ComplexityViewer';

const AlgoInfo = () => {
  const style: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '500',
      textDecoration: 'underline',
      marginBottom: '1rem',
    },
    info: {
      display: 'flex',
      //   justifyContent: 'space-between',
      width: '100%',
    },
    infoLeft: {
      width: '60%',
      borderRight: '.5px outset gray',
      padding: '0 5px',
    },
    infoTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      textDecoration: 'underline',
      marginBottom: '1rem',
    },
    infoRight: {
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0',
      gap: '2rem',
      //   borderLeft: '.5px outset gray',
    },
  };
  return (
    <div style={style.container}>
      <div style={style.title}>BubbleSort</div>
      <div style={style.info}>
        <div style={style.infoLeft}>
          <div style={style.infoTitle}>Description</div>
          <div>
            Bubble sort is a simple sorting algorithm that repeatedly steps
            through the list, compares adjacent elements and swaps them if they
            are in the wrong order. The pass through the list is repeated until
            no
          </div>
        </div>
        <div style={style.infoRight}>
          <ComplexityViewer
            title='Time Complexity'
            best='O(n^2)'
            average='O(n^2)'
            worst='O(n^2)'
          />
          <ComplexityViewer
            title='Space Complexity'
            best='O(1)'
            average='O(1)'
            worst='O(1)'
          />
        </div>
      </div>
    </div>
  );
};

export default AlgoInfo;
