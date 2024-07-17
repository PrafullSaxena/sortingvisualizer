import { CiPause1, CiPlay1, CiShuffle } from 'react-icons/ci';
import styled from 'styled-components';
import { updateElements } from '../store/slice/elementSlice';
import { changeApplicationState, resetState } from '../store/slice/stateSlice';
import { ElementService } from '../utils/ElementService';
import { APPLICATION_STATE, Algo } from '../utils/Types';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import IconButton from './IconButton';
import SortingFactory from '../utils/sorting/SortingFactory';

const Grid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const ButtonGrid = () => {
  const length = useAppSelector((state) => state.settings.arraySize);
  const appState = useAppSelector(
    (state) => state.applicationstate.currentState
  );
  const selectedAlgo = useAppSelector(
    (state) => state.applicationstate.selectedAlgo
  );
  const dispatch = useAppDispatch();

  const onPlay = () => {
    dispatch(changeApplicationState(APPLICATION_STATE.RUNNING));
    const algoService: Algo = SortingFactory.getAlgo(selectedAlgo);
    algoService.start();
  };
  const onPause = () => {
    dispatch(changeApplicationState(APPLICATION_STATE.PAUSED));
  };
  const onShuffle = () => {
    const service = new ElementService();
    const createdArray = service.createAray(length);
    dispatch(updateElements(createdArray));
    dispatch(resetState());
  };
  return (
    <Grid>
      <IconButton
        title='Play'
        Icon={CiPlay1}
        onClick={onPlay}
        isDisabled={appState === APPLICATION_STATE.RUNNING}
      />
      {/* <IconButton
        title='Stop'
        Icon={CiPause1}
        onClick={onPause}
        isDisabled={appState !== APPLICATION_STATE.RUNNING}
      /> */}
      <IconButton
        title='Shuffle'
        Icon={CiShuffle}
        onClick={onShuffle}
        isDisabled={appState === APPLICATION_STATE.RUNNING}
      />
    </Grid>
  );
};

export default ButtonGrid;
