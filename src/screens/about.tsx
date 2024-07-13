import { FaXmark } from 'react-icons/fa6';
import IconButton from '../components/IconButton';
import AlgoInfo from './algoInfo';
import { useState } from 'react';
import { COLOR } from '../data/AppContants';

const AboutScreen = () => {
  const onModelClose = () => {
    console.log('Model Closed');
  };

  const highlightButtonColor = '#FF0000';
  const [selectedButton, setSelectedButton] = useState('About');

  const style: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'absolute',
      top: '10rem',
      left: '10rem',
      widows: '50%',
      border: '1px solid black',
      borderRadius: '10px',
      backgroundColor: `${COLOR.BLACK}`,
      cursor: 'move',
      boxShadow: `0 0 5px rgba(0,0,0,.05), 2px 2px 5px rgba(0,0,0,.1)`,
      height: '80%',
      width: '80%',
      minWidth: '40rem',
      minHeight: '40rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      overflow: 'hidden',
    },
    innrebox: {
      display: 'flex',
      alignItems: 'center',
    },
    menubar: {
      zIndex: 1,
      width: '100%',
      backgroundColor: '#c92828',
      display: 'flex',
      color: 'white',
      justifyContent: 'flex-end',
    },
    leftPanel: {
      width: '20%',
      height: '100vh',
      borderRight: '2px outset gray',
      overflow: 'hidden',
      // padding: '1rem',
    },
    menubutton: {
      padding: '1rem',
      cursor: 'pointer',
      // backgroundColor: '#c92828',
      // color: 'white',
      width: '100%',
      borderBottom: '1px solid gray',
    },
    selectedButton: {
      backgroundColor: highlightButtonColor,
    },
    greyedButton: {
      padding: '1rem',
      width: '100%',
      borderBottom: '1px solid gray',
      backgroundColor: 'grey',
      color: 'white',
    },
    rightPanel: {
      position: 'relative',
      width: '70%',
      height: '100%',
      padding: '1rem',
      paddingTop: '2rem',
      paddingRight: '2rem',

      display: 'flex',
      flexDirection: 'column',
    },
    closeButton: {
      position: 'absolute',
      top: '3px',
      right: '-4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={style.container} draggable='true'>
      <div style={style.menubar}>
        <IconButton title='close' Icon={FaXmark} onClick={onModelClose} />
      </div>
      <div style={style.innrebox}>
        <div style={style.leftPanel}>
          <div
            style={style.menubutton}
            className={selectedButton === 'About' ? '.selected-button' : ''}
          >
            About Algo
          </div>
          <div style={style.greyedButton}>IMPLEMENTATIONS</div>
          <div style={style.menubutton}>Java</div>
          <div style={style.menubutton}>Python</div>
          <div style={style.menubutton}>JavaScript</div>
          <div style={style.menubutton}>C Langugage</div>
        </div>
        <div style={style.rightPanel}>
          <AlgoInfo />
          {/* <div style={style.closeButton}>
          <IconButton title='close' Icon={FaXmark} onClick={onModelClose} />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
