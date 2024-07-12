import styled from 'styled-components';
import { changeSpeed, setArraySize } from '../store/slice/settingsSlice';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import Slider from './Slider';
import LineBreak from './lineBreak';
import { APPLICATION_STATE } from '../utils/Types';
import { resetState } from '../store/slice/stateSlice';

const Container = styled.div`
  /* margin-top: 150px; */
  position: absolute;
  background-color: #fff;
  top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 20px;
  width: 220px;
  border: 1px solid #000;
  border-radius: 10px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Iteam = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Value = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 600;
`;

const Settings = () => {
  const settings = useAppSelector((state) => state.settings);
  const appState = useAppSelector(
    (state) => state.applicationstate.currentState
  );
  const dispatch = useAppDispatch();
  const onSpeedChange = (speed: number) => {
    dispatch(changeSpeed(speed));
  };
  const onArraySizeChange = (size: number) => {
    dispatch(resetState());
    dispatch(setArraySize(size));
  };
  return (
    <Container>
      {/* Settings for time delay */}
      <Row>
        <Iteam>Delay</Iteam>
        <Value>{settings.speed} ms</Value>
      </Row>
      <Slider
        defaultValue={settings.speed}
        min={settings.minSpeed}
        max={settings.maxSpeed}
        onChange={onSpeedChange}
      />
      <LineBreak />
      {/* Settings for array size */}
      <Row>
        <Iteam>Array Size</Iteam>
        <Value>{settings.arraySize}</Value>
      </Row>
      <Slider
        disabled={appState === APPLICATION_STATE.RUNNING}
        defaultValue={settings.arraySize}
        min={settings.arraySizeMin}
        max={settings.arraySizeCap}
        onChange={onArraySizeChange}
      />
    </Container>
  );
};

export default Settings;
