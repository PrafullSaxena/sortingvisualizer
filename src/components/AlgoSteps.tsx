import { AlgoStepType } from '../utils/Types';

const AlgoSteps = ({
  title,
  description,
  array,
  result,
  steps,
}: AlgoStepType) => {
  return (
    <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
      {title && <h3>{title}</h3>}
      <p>{description}</p>
      {array && <pre>{JSON.stringify(array)}</pre>}
      {result && (
        <div>
          <strong>Result: </strong>
          <pre>{JSON.stringify(result)}</pre>
        </div>
      )}
      {steps &&
        steps.map((subStep, index) => (
          <AlgoSteps
            key={index}
            title={subStep.title}
            description={subStep.description}
            array={subStep.array}
            result={subStep.result}
            steps={subStep.steps}
          />
        ))}
    </div>
  );
};

export default AlgoSteps;
