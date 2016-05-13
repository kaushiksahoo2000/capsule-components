class CameraSwipeChild extends Component {
  constructor(){
    super()
  }

  componentWillMount(){
    console.log("inside CameraSwipeChild")
    console.log(this.props.left)
    console.log(this.props.right)
  }

  componentWillReceiveProps(nextProps){
    console.log("will receiving props FIRING")
    if(nextProps.left || nextProps.right)
      setTimeout(()=>{this.props.reset()}, 2000)
  }

  render(){
    return (
      <div>
      {"" + this.props.left}
      {"" + this.props.right}
      </div>
    )
  }
}

export default CameraSwipeChild
