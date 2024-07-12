import { IconType } from 'react-icons';
import { CiLineHeight } from 'react-icons/ci';
import styled from 'styled-components';

const Container = styled.div`
  /* width: 170px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  fontsize: '18px';
  fontweight: 300;
`;

const IconText = ({
  title,
  Icon = CiLineHeight,
}: {
  title: string;
  Icon?: IconType;
}) => {
  return (
    <Container>
      <Icon style={style.icon} />
      <Title>{title}</Title>
    </Container>
  );
};

const style: { [key: string]: React.CSSProperties } = {
  icon: {
    marginRight: '8px',
    fontSize: '24px',
  },
};

export default IconText;
