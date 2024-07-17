import ComplexityViewer from '../components/ComplexityViewer';
import { Algo } from '../utils/Types';

const AlgoInfo = ({ service }: { service: Algo }) => {
  const style: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '40rem',
      padding: '3rem 2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '500',
      textDecoration: 'underline',
      marginBottom: '1rem',
    },
    text: {
      fontSize: '1.2rem',
      fontWeight: '300',
      marginTop: '2rem',
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
      <div style={style.title}>{service.getName()}</div>
      <div style={style.info}>
        <div style={style.infoLeft}>
          <div style={style.infoTitle}>Description</div>
          <div style={style.text}>{service.getDescription()}</div>
        </div>
        <div style={style.infoRight}>
          <ComplexityViewer
            title='Time Complexity'
            best={service.getTimeComplexity().best}
            average={service.getTimeComplexity().average}
            worst={service.getTimeComplexity().worst}
          />
          <ComplexityViewer
            title='Space Complexity'
            best={service.getSpaceComplexity().best}
            average={service.getSpaceComplexity().average}
            worst={service.getSpaceComplexity().worst}
          />
        </div>
      </div>
    </div>
  );
};

export default AlgoInfo;
