import React, { Component } from 'react'
import './App.css';
import S1 from './S1/S1'
import S2 from './S2/S2'
import S3 from './S3/S3'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      step: 1,
    }
  }

  stepCallback = (args) => {
    this.setState({ step: args })
  }

  back = () => {
    this.setState({ step: this.state.step - 1 })
  }

  render() {
    return (
      <div className="App">
        {this.state.step > 1 && this.state.step !== 3 && <div className="Back_Btn">
          <img src="./res/back.png" alt="" onClick={this.back}></img>
          <p>Back</p>
        </div>}
        {this.state.step === 1 && <S1 callback={this.stepCallback} />}
        {this.state.step === 2 && <S2 callback={this.stepCallback} />}
        {this.state.step === 3 && <S3 />}
      </div>
    )
  }
}

export default App;
