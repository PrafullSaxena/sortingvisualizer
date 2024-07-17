import styled from 'styled-components';
import CodeHighlight from '../components/CodeHighlight';
import IconButton from '../components/IconButton';
import { IoCopySharp } from 'react-icons/io5';
import AlgoSteps from '../components/AlgoSteps';
import { AlgoStepType } from '../utils/Types';

type CodeContainerProps = {
  codeString: string;
  langugae: string;
  algoSteps: AlgoStepType[];
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: flex-start;
`;

const Left = styled.div`
  margin-left: 10px;
  width: 70%;
  border-radius: 8px;
`;

const Right = styled.div`
  width: 100%;
  padding-inline: 1rem 0;
`;

const AlgoInfo = styled.div`
  font-family: 'Courier New', Courier, monospace;
  height: 35rem;
  overflow-y: auto;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

const EmptySpace = styled.div`
  height: 2rem;
`;

const CodeContainer = ({
  codeString,
  langugae,
  algoSteps,
}: CodeContainerProps) => {
  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
  };
  return (
    <MainContainer>
      <Container>
        <Left>
          <Title>Algorithm Steps</Title>
          <AlgoInfo className='scroll-container'>
            <AlgoSteps steps={algoSteps} />
          </AlgoInfo>
        </Left>
        <Right>
          <Title>
            Code{' '}
            <IconButton title='copy' Icon={IoCopySharp} onClick={copyCode} />
          </Title>
          <CodeHighlight codeString={codeString} language={langugae} />
        </Right>
      </Container>
      <EmptySpace />
    </MainContainer>
  );
};

export default CodeContainer;
