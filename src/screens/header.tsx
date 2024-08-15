import styled from 'styled-components';
import { ALGORITHMS, CONSTANT } from '../data/AppContants';
import { FC } from 'react';
import Dropdown from '../components/Dropdown';
import SettingsContainer from '../components/SettingsContainer';
import ButtonGrid from '../components/ButtonGrid';
import IconText from '../components/IconText';
import { CiSquareMore } from 'react-icons/ci';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { changeSelectedAlgo, setModelState } from '../store/slice/stateSlice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #764abc;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const AlgoInfo = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
  width: 180px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 400;
`;

const Header: FC = () => {
  const algos = Object.values(ALGORITHMS);
  const selectedAlgo = useAppSelector(
    (state) => state.applicationstate.selectedAlgo
  );
  const dispatch = useAppDispatch();
  const onSelectedAlgo = (algo: string) => {
    dispatch(changeSelectedAlgo(algo));
  };
  const handleAlgoInfo = () => {
    dispatch(setModelState(true));
    console.log('Logging selected algo');
  };

  return (
    <Container>
      <Logo>{CONSTANT.TITLE_APP.toLocaleUpperCase()}</Logo>
      <SettingsContainer />
      <Dropdown items={algos} onItemSelected={onSelectedAlgo} />
      <AlgoInfo onClick={handleAlgoInfo}>
        <IconText title={selectedAlgo} Icon={CiSquareMore} />
      </AlgoInfo>
      <ButtonGrid />
    </Container>
  );
};

export default Header;
