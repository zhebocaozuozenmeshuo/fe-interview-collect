import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const log = function () {
  console.log.apply(console, arguments)
}



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: window.location.hash.substr(1)
    }
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      log('hash has changed')
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }
  render() {
    let Child
    log(this.state.route)
    switch (this.state.route) {
      case '/index':
        Child = IndexApp
        break
      case '/searchBox':
        Child = FilterableProductTable
        break
      default:
        Child = IndexApp
        break
    }
    return (
      <div className="App">
        <nav>
          <ul className='clearfix'>
            <li><a href="#/index">index</a></li>
            <li><a href="#/searchBox">searchBox</a></li>
          </ul>
        </nav>
        <Child products={PRODUCTS} />
      </div>
    );
  }
}
/** 下面是模拟数据 */
let PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
]
/** 下面是 Thinking in react 相关代码 */
class ProductCategoryRow extends Component {
  render() {
    return (
      <tr>
        <th colSpan='2' style={{ border: '1px solid rgb(95, 253, 254)' }}>
          {this.props.category}
        </th>
      </tr>
    )
  }
}

class ProductRow extends Component {
  render() {
    let name = this.props.product.stocked ?
      this.props.product.name :
      (
        <span style={{ color: 'red', }}>{this.props.product.name}</span>
      )
    return (
      <tr style={{ border: '1px solid rgb(255, 152, 154)', }}>
        <td>{name}</td>
        <td>
          {this.props.product.price}
        </td>
      </tr>
    )
  }
}

class ProductTable extends Component {
  render() {
    let rows = []
    let lastCategory = null
    this.props.products.forEach((product) => {
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow category={product.category} key={product.category} />
        )
      }
      rows.push(
        <ProductRow product={product} key={product.name} />
      )
      lastCategory = product.category
    })
    return (
      <div style={{ border: '1px solid rgb(145,252,164)', }}>
        <table style={{textAlign: 'left'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

class SeacchBar extends Component {
  handleFilterTextInputChange = (e) => {
    this.props.onFilterTextInput(e.target.value)
  }
  handleInStockInputChange = (e) => {
    log(1)
    this.props.onInStockInput(e.target.checked)
  }
  render() {
    return (
      <div style={{ border: '1px solid rgb(178, 194, 254)',padding:' 7px 0', width:'190px', marginBottom: '15px' }}>
        <form action="#">
          <input type="text" placeholder='Search...' 
            value={this.props.filterText}
            onChange = {this.handleFilterTextInputChange}/>
          <p style={{ fontSize: '11px' }}>
            <input type="checkbox" name="" id="" 
              checked={this.props.inStockOnly}
              onChange = {this.handleInStockInputChange}/>
            {' '}
            Only show products in stock
          </p>
        </form>
      </div>
    )
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      inStockOnly: false,
    }
  }
  handleFilterTextInput = (filterText) => {
    this.setState({
      filterText, 
    })
  }
  handleInStockInput = (inStockOnly) => {
    this.setState({
      inStockOnly,
    })
  }
  render() {
    return (
      <div style={{ border: '1px solid rgb(255,222,158)', padding: '15px', width: '300px', }}>
        <SeacchBar 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextInput = {this.handleFilterTextInput}
          onInStockInput = {this.handleInStockInput}
          />
        <ProductTable 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={this.props.products} />
      </div>
    )
  }
}
/** 下面是原主页的相关代码 */
function IndexApp() {
  return (
    <div>
      <div style={{ border: '1px solid red', height: '700px', }}>
        <h1>组合 vs 继承</h1>
        <WelcomeDialog />
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
  )
}

/** 下面是组合继承的相关代码 */
function WelcomeDialog() {
  return (
    <FancyBorder color='blue'>
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}
function FancyBorder(props) {
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  )
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
  if (Number.isNaN(input)) {
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
          onTemperatureChange={this.handleCelsiusChange} />

        <TempeartureInput
          scale='f'
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)} />

      </div>
    )
  }
}
export default App;
