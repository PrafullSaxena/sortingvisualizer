import LineContainer from './LineContainer';
import Header from './header';
import AboutScreen from './about';
import { useAppSelector } from '../utils/hooks';

const Home = () => {
  const modelOpen = useAppSelector((state) => state.applicationstate.modelOpen);
  return (
    <>
      <div className='home'>
        <Header />
        <LineContainer />
        {modelOpen && <AboutScreen />}
      </div>
    </>
  );
};

export default Home;
