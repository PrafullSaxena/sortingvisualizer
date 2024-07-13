import LineContainer from './LineContainer';
import AboutScreen from './about';
import Header from './header';

const Home = () => {
  return (
    <>
      <div className='home'>
        <Header />
        <LineContainer />
        <AboutScreen />
      </div>
    </>
  );
};

export default Home;
