import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector, useListentArraySizeChange } from '../utils/hooks';
import { CONSTANT } from '../data/AppContants';

const Container = styled.div`
  border: 1px solid #000;
  margin-top: 0%;
  padding-top: 0%;
  padding-bottom: 10px;
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const LineContainer = () => {
  const elements = useAppSelector((state) => state.elements.lines);
  const primaryIndex = useAppSelector(
    (state) => state.applicationstate.currentPrimary
  );
  const secondaryIndex = useAppSelector(
    (state) => state.applicationstate.currentSecondary
  );
  const speed = useAppSelector((state) => state.settings.speed);
  useListentArraySizeChange();

  useEffect(() => {
    console.log('Current Speed - ', { speed });
  }, [speed]);

  return (
    <>
      <Container>
        {elements.map((element, index) => (
          <div
            key={index}
            style={{
              height: `${element.height}%`,
              width: '1%',
              backgroundColor: `${
                index === primaryIndex
                  ? CONSTANT.LINE_PRIMARY
                  : index === secondaryIndex
                  ? CONSTANT.LINE_SECONDARY
                  : element.color
              }`,
              border: '1px solid #ff7171',
              // border: '1px solid #4990f3',
              //   boxShadow: '0 -4px 6px -2px rgba(0, 0, 0, 0.3)',
            }}
          ></div>
        ))}
      </Container>
    </>
  );
};

export default LineContainer;
