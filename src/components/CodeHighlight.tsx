// import SyntaxHighlighter from 'react-syntax-highlighter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  atomDark,
  cb,
  gruvboxDark,
  oneDark,
  twilight,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeHighlightProps = {
  codeString: string;
  language: string;
};

const CodeHighlight = ({ codeString, language }: CodeHighlightProps) => {
  const style: { [key: string]: React.CSSProperties } = {
    container: {
      maxHeight: '1000px',
      height: '35rem',
      width: '100%',
      maxWidth: '40rem',
      overflowY: 'auto',
      // borderRadius: '8px',
    },
  };

  return (
    <div style={style.container} className='scroll-container'>
      <SyntaxHighlighter style={cb} language={language} wrapLongLines={true}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeHighlight;
