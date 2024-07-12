import { useState } from 'react';
import { CiCircleChevDown } from 'react-icons/ci';
import styled from 'styled-components';
import IconText from './IconText';
import { useAppSelector } from '../utils/hooks';
import { APPLICATION_STATE } from '../utils/Types';

type DropdownProp = {
  items: string[];
  onItemSelected: (item: string) => void;
};

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  padding: 10px;
  width: 150px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;

const UL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1;
`;

const LI = styled.li`
  padding: 10px;
  cursor: pointer;
  width: 150px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Dropdown = ({ items, onItemSelected }: DropdownProp) => {
  const appState = useAppSelector(
    (state) => state.applicationstate.currentState
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onItemSelected(item);
    setIsOpen(false);
  };

  return (
    <Container>
      <Button
        onClick={toggleDropdown}
        disabled={appState === APPLICATION_STATE.RUNNING}
      >
        {selectedItem ? (
          <IconText title={selectedItem} />
        ) : (
          <IconText title='Select an Algo' Icon={CiCircleChevDown} />
        )}
      </Button>

      {isOpen && (
        <UL>
          {items.map((item, index) => (
            <LI key={index} onClick={() => handleItemClick(item)}>
              <IconText title={item} />
            </LI>
          ))}
        </UL>
      )}
    </Container>
  );
};

export default Dropdown;
