import Header from "./Header";
import Content from "./Content";

const Course = (props) => {
  return (
    <>
      <Header text={props.course.name} />
      <Content course={props.course} />
    </>
  );
};

export default Course;
