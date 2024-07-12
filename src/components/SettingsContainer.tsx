import { useState } from 'react';
import { CiCircleChevDown } from 'react-icons/ci';
import styled from 'styled-components';
import IconText from './IconText';
import Settings from './Settings';

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
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
