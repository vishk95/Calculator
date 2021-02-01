import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      input: '0',
      output: '',
      operation: ''
    }
    this.handleClear = this.handleClear.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleComputation = this.handleComputation.bind(this);
  }
  
  handleClear() {
    this.setState({
      input: '0',
      output: '',
      operation: ''
  });
  }
  
  handleNumber(e) {
    let newIn;
    if (e.target.innerText === "." && this.state.input.includes(".")){return}
    else if(this.state.input === '0' && e.target.innerText !== "."){newIn = e.target.innerText} else {newIn = this.state.input + e.target.innerText}    
    this.setState({
      input: newIn,
      output: this.state.output,
      operation: this.state.operation
    });
  }
  
  handleOperation(e){
    if (this.state.output !== "" && (this.state.input !== "" && this.state.input !== "-")) {
      this.handleComputation(e);
      return;
    }
    if ((this.state.input === "" || this.state.input === "-")&& this.state.output !== "") {
      if(e.target.innerText === "-" && this.state.operation !== ""){
        this.setState({
          input: this.state.input + e.target.innerText,
          output: this.state.output,
          operation: this.state.operation
        })
        return;
      }
      this.setState({
      input: '',
      output: this.state.output,
      operation: e.target.innerText
      })
    } else {
      this.setState({
        input: '',
        output: this.state.input,
        operation: e.target.innerText
      })
    }
  }
  
  handleComputation(e){
    let result;
    const prev = parseFloat(this.state.output)
    const current = parseFloat(this.state.input)
    if(isNaN(prev) || isNaN(current)) return
    switch (this.state.operation){
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '/':
        result = prev / current;
        break;
      case '×':
        result = prev * current;
        break;
      default:
        return
    }
    if(e.target.innerText === "="){
      this.setState({
      input: result,
      output: '',
      operation: ''
      })
    } else {
      this.setState({
      input: '',
      output: result,
      operation: e.target.innerText
      })
    }
  }
  
  render(){
    return(
    <div id="container">
        <div id="all-display">
          <div id="history">{this.state.output}{this.state.operation}</div>
          <div id="display">{this.state.input}</div>
        </div>
        <div id="buttons">
          <button className="span-two" id="clear" onClick={this.handleClear}>AC</button>
          <button id="divide" onClick={this.handleOperation}>/</button>
          <button id="multiply" onClick={this.handleOperation}>&times;</button>
          <button id="seven" onClick={this.handleNumber}>7</button>
          <button id="eight" onClick={this.handleNumber}>8</button>
          <button id="nine" onClick={this.handleNumber}>9</button>
          <button id="subtract" onClick={this.handleOperation}>-</button>
          <button id="four" onClick={this.handleNumber}>4</button>
          <button id="five" onClick={this.handleNumber}>5</button>
          <button id="six" onClick={this.handleNumber}>6</button>
          <button id="add" onClick={this.handleOperation}>+</button>          
          <button id="one" onClick={this.handleNumber}>1</button>
          <button id="two" onClick={this.handleNumber}>2</button>
          <button id="three" onClick={this.handleNumber}>3</button>
          <button className="span-two-row" id="equals" onClick={this.handleComputation}>=</button>
          <button className="span-two" id="zero" onClick={this.handleNumber}>0</button>
          <button id="decimal" onClick={this.handleNumber}>.</button>
        </div>
    </div>)
  }
}

//ReactDOM.render(<Calculator/>, document.getElementById('root'));

export default App;
