const Course = (props) => {


    return (
      <div>
        <Header course={props.course.name}></Header>
        <Content parts={props.course.parts}></Content>
        <Total parts={props.course.parts}></Total>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map(part =>
          <Part key={part.id} part={part["name"]} exercise={part["exercises"]}></Part>
        )
        }
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercise}
        </p>
      </>
    )
  }
  
  
  
  const Total = (props) => {
  
    return (
      <>
  
        <p>Number of exercises {props.parts.reduce((a, { exercises }) => a + exercises, 0)}</p>
      </>
    )
  }


  export default Course