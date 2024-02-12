import Part from "./Part";

const Content = (props) => {
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <>
      {props.course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
    </>
  );
};

export default Content;
