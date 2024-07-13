import { useState } from 'react';
import { CiCircleChevDown } from 'react-icons/ci';
import styled from 'styled-components';
import IconText from './IconText';
import Settings from './Settings';
import { COLOR } from '../data/AppContants';

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  background-color: transparent;
  color: ${COLOR.WHITE};
  cursor: pointer;
`;

const SettingsContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <Button onClick={toggleSettings}>
        <IconText title='Settings' Icon={CiCircleChevDown} />
      </Button>
      {isOpen && <Settings />}
    </Container>
  );
};

export default SettingsContainer;
