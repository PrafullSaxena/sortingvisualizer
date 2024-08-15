import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { FaXmark } from 'react-icons/fa6';
import IconButton from '../components/IconButton';
import { COLOR, MODEL_OPTIONS } from '../data/AppContants';
import { setModelState } from '../store/slice/stateSlice';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import AlgoInfo from './algoInfo';
import CodeContainer from './codeContainer';
import SortingFactory from '../utils/sorting/SortingFactory';
import { Algo } from '../utils/Types';

const AboutScreen = () => {
  const modelState = useAppSelector(
    (state) => state.applicationstate.modelOpen
  );
  const selectedAlgo = useAppSelector(
    (state) => state.applicationstate.selectedAlgo
  );
  const dispatch = useAppDispatch();

  const [algoService, setAlgoService] = useState<Algo>(
    SortingFactory.getAlgo(selectedAlgo)
  );

  const onModelClose = () => {
    dispatch(setModelState(false));
    console.log('Model Closed');
  };

  useEffect(() => {
    setAlgoService(SortingFactory.getAlgo(selectedAlgo));
  }, [modelState]);

  const [codeString, setCodeString] = useState(algoService.getJavaCode());
  const [lang, setLang] = useState('java');

  const [selectedButton, setSelectedButton] = useState(MODEL_OPTIONS.ABOUT);

  const onMenuButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    if (buttonName === MODEL_OPTIONS.JAVA) {
      setCodeString(algoService.getJavaCode());
      setLang('java');
    } else if (buttonName === MODEL_OPTIONS.PYTHON) {
      setCodeString(algoService.getPythonCode());
      setLang('python');
    } else if (buttonName === MODEL_OPTIONS.JAVASCRIPT) {
      setCodeString(algoService.getJavascriptCode());
      setLang('javascript');
    } else if (buttonName === MODEL_OPTIONS.C) {
      setCodeString(algoService.getCCode());
      setLang('c');
    }
  };

  const style: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'absolute',
      top: '10rem',
      left: '10rem',
      border: '1px solid black',
      borderRadius: '10px',
      backgroundColor: `${COLOR.BLACK}`,
      boxShadow: `0 0 5px rgba(0,0,0,.05), 2px 2px 5px rgba(0,0,0,.1)`,
      width: '80%',
      minWidth: '40rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      overflow: 'hidden',
    },
    innrebox: {
      display: 'flex',
      width: '100%',
      alignItems: 'start',
    },
    menubar: {
      cursor: 'move',
      zIndex: 1,
      width: '100%',
      backgroundColor: `${COLOR.PRIMARY}`,
      display: 'flex',
      color: 'white',
      justifyContent: 'flex-end',
    },
    leftPanel: {
      width: '20%',
      borderRight: '2px outset gray',
      overflow: 'hidden',
    },
    menubutton: {
      padding: '1rem',
      cursor: 'pointer',
      width: '100%',
      borderBottom: '1px solid gray',
    },
    greyedButton: {
      padding: '1rem',
      width: '100%',
      borderBottom: '1px solid gray',
      backgroundColor: 'grey',
      color: 'white',
    },
    rightPanel: {
      width: '100%',
    },
    closeButton: {
      position: 'absolute',
      top: '3px',
      right: '-4px',
      cursor: 'pointer',
    },
  };

  return (
    <Draggable bounds='parent' handle='.menubar'>
      <div style={style.container}>
        <div style={style.menubar} className='menubar'>
          <IconButton title='close' Icon={FaXmark} onClick={onModelClose} />
        </div>
        <div style={style.innrebox}>
          <div style={style.leftPanel}>
            <div
              style={style.menubutton}
              className={`${
                selectedButton === MODEL_OPTIONS.ABOUT ? 'selected-button' : ''
              }`}
              onClick={() => onMenuButtonClick(MODEL_OPTIONS.ABOUT)}
            >
              About Algo
            </div>
            <div style={style.greyedButton}>IMPLEMENTATIONS</div>
            <div
              style={style.menubutton}
              onClick={() => onMenuButtonClick(MODEL_OPTIONS.JAVA)}
              className={`${
                selectedButton === MODEL_OPTIONS.JAVA ? 'selected-button' : ''
              }`}
            >
              Java
            </div>
            <div
              style={style.menubutton}
              onClick={() => onMenuButtonClick(MODEL_OPTIONS.PYTHON)}
              className={`${
                selectedButton === MODEL_OPTIONS.PYTHON ? 'selected-button' : ''
              }`}
            >
              Python
            </div>
            <div
              style={style.menubutton}
              onClick={() => onMenuButtonClick(MODEL_OPTIONS.JAVASCRIPT)}
              className={`${
                selectedButton === MODEL_OPTIONS.JAVASCRIPT
                  ? 'selected-button'
                  : ''
              }`}
            >
              JavaScript
            </div>
            <div
              style={style.menubutton}
              onClick={() => onMenuButtonClick(MODEL_OPTIONS.C)}
              className={`${
                selectedButton === MODEL_OPTIONS.C ? 'selected-button' : ''
              }`}
            >
              C Langugage
            </div>
          </div>
          <div style={style.rightPanel}>
            {selectedButton === MODEL_OPTIONS.ABOUT ? (
              <AlgoInfo service={algoService} />
            ) : (
              <CodeContainer
                codeString={codeString}
                langugae={lang}
                algoSteps={algoService.getAlgoSteps()}
              />
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default AboutScreen;
