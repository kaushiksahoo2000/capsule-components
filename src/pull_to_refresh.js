//in progress
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class PullToRefresh extends Component {
  constructor(loadingStyle, listStyle) {
    super()
    this.state = {
      isTouched: false,
      prevY: 0,
      nextY: 0,
      loading: 'none',
      transition: 'none'
    }
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this))
    document.addEventListener('mouseup', this.mouseUpHandler.bind(this))
  }

  stop(e) { e.preventDefault(); e.stopPropagation() }

  mouseDownHandler(e) {
    if(e) this.stop(e)
    this.props.onPullStart()
    this.setState({
      isTouched: true,
      prevY: e.currentTarget.offsetTop - e.clientY,
      transition: 'none'
    })
  }

  mouseMoveHandler(e) {
    if(e) this.stop(e)
    if(this.state.isTouched === true) {
      this.props.onPull()
      this.setState({
        nextY: e.clientY + this.state.prevY,
        loading: 'block'
      })
      if(this.state.nextY > this.props.threshold) this.mouseUpHandler()
    }
  }

  mouseUpHandler(e) {
    if(e) this.stop(e)
    this.props.onPullEnd()
    this.setState({
      isTouched: false,
      nextY: 0,
      loading: 'none',
      transition: `top ${this.props.snap}ms`
    })
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.loading, position: 'absolute', top: 0 }} >
          {this.props.children[0]}
        </div>
        <div style={{ position: 'relative', top: this.state.nextY, transition: this.state.transition }}
          onMouseDown={(e) => this.mouseDownHandler(e)} >
          {this.props.children.slice(1)}
        </div>
      </div>
    )
  }
}


/*-------- Testing --------*/

ReactDOM.render(
  <PullToRefresh threshold={250} snap={250}
    onPullStart={() => {console.log('started pulling')}}
    onPull={() => {console.log('pulling')}}
    onPullEnd={() => {console.log('ended pulling')}}>
    <div>
      FirstDiv
    </div>
    <div>
      SecondDiv<br/>
      SecondDiv<br/>
      SecondDiv<br/>
      SecondDiv<br/>
      SecondDiv<br/>
    </div>
  </PullToRefresh>,
  document.querySelector('#container')
)
