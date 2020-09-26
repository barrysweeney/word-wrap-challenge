import React from 'react';
import Layout from './Components/Layout';
import Wrap from "./Components/Wrap"

class App extends React.Component {
  state = {
    inputWord: "",
    top: "",
    bottom: "",
    sides: [],
    whiteSpacePadding: "",
  }

  async setInputWord(e) {
    await this.setState({
      inputWord: e.currentTarget.value
    })

    this.setWhiteSpacePadding();
    this.setWrappedWord();
  }

  setWhiteSpacePadding() {
    let whiteSpace = "";
    for (let i = 0; i < this.state.inputWord.length - 2; i++) {
      whiteSpace += " ";
    }
    this.setState({
      whiteSpacePadding: whiteSpace
    })
  }

  setWrappedWord() {
    let top = this.state.inputWord;
    let bottom = "";
    let sides = []
    for (let i = 1; i < this.state.inputWord.length - 1; i++) {
      sides.push(this.state.inputWord.charAt(i) + this.state.whiteSpacePadding + this.state.inputWord.charAt(this.state.inputWord.length - 1 - i));
    }
    for (let i = this.state.inputWord.length; i >= 0; i--) {
      bottom += this.state.inputWord.charAt(i);
    }
    this.setState({
      top: top,
      sides: sides,
      bottom: bottom,
    })
  }

  render() {
    return (
      <Layout>
        <h1>Word Wrap <span role="img" aria-label="emoji of a taco">🌮</span></h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="inputWord">Please input a word:</label>
          <input name="inputWord" onChange={this.setInputWord.bind(this)}></input>
        </form >
        <Wrap>
          <pre>{this.state.top}</pre>
          {this.state.sides.map(side => (<pre>{side}</pre>))}
          <pre>{this.state.bottom}</pre>
        </Wrap>

      </Layout>

    );
  }
}

export default App;
