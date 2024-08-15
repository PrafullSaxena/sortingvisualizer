import { useEffect, useState } from 'react';
import { LANGUGAE } from '../data/AppContants';
import { useAppSelector } from '../utils/hooks';
import SortingFactory from '../utils/sorting/SortingFactory';
import CodeHighlight from '../components/CodeHighlight';

const CodeScreen = () => {
  const selectedAlgo = useAppSelector(
    (state) => state.applicationstate.selectedAlgo
  );
  const [selectedLangugae, setSelectedLangugae] = useState(LANGUGAE.JAVA);
  const [codeString, setCodeString] = useState('');

  let sortService = SortingFactory.getAlgo(selectedAlgo);

  useEffect(() => {
    sortService = SortingFactory.getAlgo(selectedAlgo);
  }, [selectedAlgo]);

  const onSelectingJava = () => {
    setCodeString(sortService.getJavaCode());

    setSelectedLangugae(LANGUGAE.JAVA);
  };
  const onSelectingPython = () => {
    setCodeString(sortService.getPythonCode());
    setSelectedLangugae(LANGUGAE.PYTHON);
  };
  const onSelectingJavaScript = () => {
    setCodeString(sortService.getJavascriptCode());
    setSelectedLangugae(LANGUGAE.JAVASCRIPT);
  };
  const onSelectingC = () => {
    setCodeString(sortService.getCCode());
    setSelectedLangugae(LANGUGAE.C);
  };
  return (
    <>
      <CodeHighlight codeString={codeString} langugae={selectedLangugae} />
    </>
  );
};

export default CodeScreen;
