//inp
import React, {Component} from 'react'
import ReactDOM from 'react-dom'



class PullToRefresh extends Component {
  constructor(loadingStyle, listStyle){
    super()
    this.state = {
      isTouched: 'false',
      isMoved: 'false',
      prevY: 0,
      afterY: 0,
      loadingStyle: {
        textAlign: 'center',
        display: 'none'
      }
    }
  }


  mouseDownHandler(e) {
    this.setState({isTouched: true, prevY: e.currentTarget.offsetTop - e.clientY})
    e.preventDefault()
    e.stopPropagation()
  }

  mouseMoveHandler(e) {
    if(this.state.isTouched === true){
      this.setState({afterY: e.clientY + this.state.prevY })
    }
    e.preventDefault()
    e.stopPropagation()
  }

  mouseUpHandler(e) {
    this.setState({isTouched: false, afterY : 0})
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return (
        <div class="list">
          <div id="touchloader" style={this.state.loadingStyle}>
            Loading.....
          </div>
              <ul id="touchlist" style={{ position: "relative", top: this.state.afterY }} onMouseDown={(e) => this.mouseDownHandler(e)}
               onMouseMove={(e) => this.mouseMoveHandler(e)} onMouseUp={(e) => this.mouseUpHandler(e)}>
                <li>test1</li>
                <li>test2</li>
                <li>test3</li>
                <li>test4</li>
                <li>test5</li>
              </ul>
        </div>
    )
  }
}


/*-------- Testing --------*/

ReactDOM.render(
  <PullToRefresh />,
  document.querySelector('#container')
)
