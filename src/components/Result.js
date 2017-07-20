import React, {Component} from 'react'
import { connect } from 'react-redux'

 class Result extends Component {
  render() {
    const { services } = this.props
    return (
      <table>
        <thead>
          <tr>
            <th>Travel By</th>
            <th>Leaving</th>
            <th>From</th>
            <th>Platform</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>

        {

            services &&
            <tbody>
            {
              this.props.routes[0].trainServices.map(train => {
                return (
                  <tr>
                    <td>{train.operator}</td>
                    <td>{train.sta}</td>
                    <td>{train.destination[0].locationName}</td>
                    <td>{train.platform}</td>
                    <td>{train.origin[0].locationName}</td>
                    <td>{  train.delayReason !== null ? <p>{` ${train.delayReason}`}</p> : <p>On Time</p> }</td>
                  </tr>
                )
              })
            }
            </tbody>
    }
  </table>
    )
  }
}

const mapStateToProps = state => {
  console.log('state i results=', state);
  return {
    routes: state.fetchRoutes
  }
}

export default connect(mapStateToProps)(Result)
