import React, {Component} from 'react'

 export default class Result extends Component {
  render() {
    const { services } = this.props
    return (
      services &&
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
            <tbody>
            {
              services.map((train,index) => {
                return (
                  <tr key={`my_key_${index}`}>
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
  </table>
    )
  }
}
