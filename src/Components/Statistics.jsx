import StatisticsLine from "./StatisticLine";

const Statistics = (props) => {
  return (
    <>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="total" value={props.total} />
      <StatisticsLine text="average" value={props.average} />
      <StatisticsLine text="positive" value={props.positive} />
    </>
  );
};

export default Statistics