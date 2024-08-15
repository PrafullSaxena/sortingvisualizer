import { IconType } from 'react-icons';
import { CiLineHeight } from 'react-icons/ci';
import styled from 'styled-components';

type IconButtonType = {
  title: string;
  Icon?: IconType;
  isDisabled?: boolean;
  onClick: () => void;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
  background: transparent;
  border: none;
  padding: 2px;
`;

const IconButton = ({
  Icon = CiLineHeight,
  isDisabled = false,
  onClick,
}: IconButtonType) => {
  return (
    <Container>
      <Button onClick={onClick} disabled={isDisabled}>
        <Icon style={style.icon} />
      </Button>
    </Container>
  );
};

const style: { [key: string]: React.CSSProperties } = {
  icon: {
    marginRight: '8px',
    fontSize: '24px',
    color: '#fff',
  },
};

export default IconButton;
