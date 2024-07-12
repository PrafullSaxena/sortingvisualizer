import styled from 'styled-components';
import { ALGORITHMS, CONSTANT } from '../data/AppContants';
import { FC } from 'react';
import Dropdown from '../components/Dropdown';
import SettingsContainer from '../components/SettingsContainer';
import ButtonGrid from '../components/ButtonGrid';
import IconText from '../components/IconText';
import { CiSquareMore } from 'react-icons/ci';
import { useAppDispatch, useAppSelector, useEnumToArray } from '../utils/hooks';
import { changeSelectedAlgo } from '../store/slice/stateSlice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const AlgoInfo = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 10px;
  width: 150px;
  border: 1px solid #ccc;
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
