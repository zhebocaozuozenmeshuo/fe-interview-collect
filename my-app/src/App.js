import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const log = function () {
  console.log.apply(console, arguments)
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ border: '1px solid red', height: '700px', }}>
          <h1>组合 vs 继承</h1>
          <h1>状态提升</h1>
          <Caculator />
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

/* 下面是状态提升相关的代码 */
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The Water would boil.</p>
  }
  return <p>The Water would not boil.</p>
}

const scaleName = {
  c: 'Celsius',
  f: 'Fahrenheit',
}

// 在组件 Caculator 中拆出一个 TempeartureInput 组件
class TempeartureInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value)
  }
  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleName[scale]}:</legend>
        <input type="text"
          value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    )
  }
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}
function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature)
  if(Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}
log('abc', tryConvert('abc', toCelsius))
log('10.22', tryConvert('10.22', toFahrenheit))
class Caculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: '',
      scale: 'c',
    }
  }
  handleCelsiusChange = (temperature) => {
    this.setState({
      temperature,
      scale: 'c',
    })
  }
  handleFahrenheitChange = (temperature) => {
    this.setState({
      temperature,
      scale: 'f',
    })
  }
  render() {
    const scale = this.state.scale
    const temperature = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    
    return (
      <div>
        <TempeartureInput 
          scale='c'
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}/>

        <TempeartureInput 
          scale='f'
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}/>

        <BoilingVerdict 
          celsius={parseFloat(celsius)}/>

      </div>
    )
  }
}
export default App;
