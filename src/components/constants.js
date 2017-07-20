import React, {Component} from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'

class CrsCode extends Component{

  componentDidMount() {
    this.props.fetchCrsCode()
  }

  render() {
    console.log('constants: ', this.props.crsCode);
    return <div></div>
  }
}

const mapStateToProps = state => {
  return {
    crsCode: state.fetchCrsCode
  }
}

export default connect(mapStateToProps, actions)(CrsCode)
