//in progress
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
      loading: "none",
      transition: ""
    }
  }


  mouseDownHandler(e) {
    this.props.onPullStart()
    this.setState({isTouched: true, prevY: e.currentTarget.offsetTop - e.clientY})
    e.preventDefault()
    e.stopPropagation()
  }

  mouseMoveHandler(e) {
    if(this.state.isTouched === true){
      this.props.onPull()
      this.setState({afterY: e.clientY + this.state.prevY, loading: "block" })
      if(this.state.afterY > this.props.threshold){
        this.props.onPullEnd()
        this.setState({isTouched: false, afterY: 0, loading: "none", transition: "top 250ms"})
      }
    }
    e.preventDefault()
    e.stopPropagation()
  }

  mouseUpHandler(e) {
    this.props.onPullEnd()
    this.setState({isTouched: false, afterY: 0, loading: "none", transition: "top 250ms"})
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return (
        <div>
          <div style={{display: this.state.loading, position: "absolute", top: 0}}>
          {this.props.children[0]}
          </div>
              <div style={{ position: "relative", top: this.state.afterY, transition: this.state.transition }} onMouseDown={(e) => this.mouseDownHandler(e)}
               onMouseMove={(e) => this.mouseMoveHandler(e)} onMouseUp={(e) => this.mouseUpHandler(e)} >
               {this.props.children.slice(1)}
              </div>
        </div>
    )
  }
}


/*-------- Testing --------*/

ReactDOM.render(
  <PullToRefresh threshold={200} onPullStart={() => {console.log("started pulling")}} onPull={() => {console.log("pulling")}} onPullEnd={() => {console.log("ended pulling")}}>
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
