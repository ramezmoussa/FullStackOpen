import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <Header title="give feedback"></Header>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <Statitics good={good} neutral={neutral} bad={bad}></Statitics>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const Statitics = (props) => {

  const getTotal = () => {
    return props.good + props.neutral + props.bad
  }

  const getAverage = () => {
    return (props.good - props.bad) / getTotal()
  }


  const getPositive = () => {
    return `${(props.good / getTotal())*100} %`
  }

  if (getTotal() !== 0) {
    return (
      <>

        <Header title="statistics"></Header>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}></StatisticLine>
            <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
            <StatisticLine text="bad" value={props.bad}></StatisticLine>
            <StatisticLine text="all" value={getTotal()}></StatisticLine>
            <StatisticLine text="average" value={getAverage()}></StatisticLine>
            <StatisticLine text="positive" value={getPositive()}></StatisticLine>
          </tbody>

        </table>
      </>
    )
  }
  return (
    <>
      <Header title="statistics"></Header>
      <p>No feedback given</p>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <th>{props.text}</th>
        <th>{props.value}</th>
      </tr>
    </>
  )
}





export default App