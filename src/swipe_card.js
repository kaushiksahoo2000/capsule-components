//in progress
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class SwipeCard extends Component {
  constructor() {
    super()
    this.state = {
      prevPos: {x: 0, y: 0},
      currPos: {x: 0, y: 0},
      cardStyle: {
        top: 0,
        left: 0,
        transform: 'rotate(0deg)',
        transition: 'transform 100ms'
      }
    }
    // this.boundMouseUpHandler = this.mouseUpHandler.bind(this)
    this.boundMouseMoveHandler = this.mouseMoveHandler.bind(this)
  }

  stop(e) { e.preventDefault(); e.stopPropagation() }    // Event stopping utility

  addHandlers() {         // Listeners added on drag start
    document.addEventListener('mousemove', this.boundMouseMoveHandler)
    document.addEventListener('touchmove', this.boundMouseMoveHandler)
    document.addEventListener('mouseup', this.boundMouseUpHandler)
    document.addEventListener('touchend', this.boundMouseUpHandler)
  }

  removeHandlers() {      // Listeners removed after drag
    document.removeEventListener('mousemove', this.boundMouseMoveHandler)
    document.removeEventListener('touchmove', this.boundMouseMoveHandler)
    document.removeEventListener('mouseup', this.boundMouseUpHandler)
    document.removeEventListener('touchend', this.boundMouseUpHandler)
  }

  mouseDownHandler(e){
    if(e) this.stop(e)
      this.setState({
        prevPos: {
          y: e.touches !== undefined ? e.touches[0].clientY : e.clientY,
          x: e.touches !== undefined ? e.touches[0].clientX : e.clientX
        }
      })
      this.addHandlers()
    }

  mouseMoveHandler(e){
    let x1 = this.state.prevPos.x
    let y1 = this.state.prevPos.y
    let x2 = e.touches !== undefined ? e.touches[0].clientX : e.clientX
    let y2 = e.touches !== undefined ? e.touches[0].clientY : e.clientY
    this.setDragPos(x1, y1, x2, y2)
  }

  setDragPos(x1, y1, x2, y2){
    let xDiff = x1 - x2
    let yDiff = y1 - y2
    let multiplier = ((xDiff >= 0 && yDiff >= 0) || (xDiff < 0 && yDiff < 0)) ? 1 : -1
    let ratio = Math.abs(xDiff/ (xDiff > 0 ? x1 : window.innerWidth - x1) )
    let angle = multiplier * ratio * 45
    this.setState({
      cardStyle: {
        top: y2 - y1,
        left: x2 - x1,
        transform: 'rotate(' + angle + 'deg)',
        transition: 'transform 100ms'
      }
    })
  }

  render() {
    return (
      <div>
            <div style={{borderWidth: 3,
                        borderRadius: 3,
                        borderStyle: 'solid',
                        borderColor: '#000',
                        position: 'absolute',
                        width: '200px',
                        height: '300px',
                        position: 'absolute', ...this.state.cardStyle}} onMouseDownCapture={this.mouseDownHandler.bind(this)}>
            Text in card
            </div>
      </div>
    )
  }
}


/*-------- Testing --------*/

ReactDOM.render(
  <div style={{
    borderWidth: 3,
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: '#000',
    position: 'absolute',
    width: '200px',
    height: '300px',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  }}>
    <SwipeCard threshold={20} />
  </div>,
  document.querySelector('#container')
)
