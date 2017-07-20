import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import CrsCode from './constants'
import Result from './Result'

class Search extends Component {
  state = {
    value: '',
    results: []
  }

  componentDidMount() {
    const storedRoutes = localStorage.getItem('routes-all');
    if(storedRoutes){
      this.setState({results: JSON.parse(storedRoutes)});
    }
    this.props.fetchCrsCode();
  }

  findCrsSuggestionsByName = (name) => {
    console.log('t=', this.props.crsCode);
    const nameFormatted = name.toLowerCase();
    return this.props.crsCode.filter((code) => {
      return code.stationName.toLowerCase() === nameFormatted;
    });
  }

  handleSubmitForm = event => {
    const { startingPoint, destination } = this.state
    event.preventDefault();
    const startingPointCrs = this.findCrsSuggestionsByName(startingPoint);
    const destinationCrs = this.findCrsSuggestionsByName(destination);
    this.props.fetchRoutes(startingPointCrs[0].crsCode, destinationCrs[0].crsCode);
    localStorage.setItem('routes', JSON.stringify({startingPoint, destination}))
    const storedRoute = JSON.parse(localStorage.getItem("routes"));
    const routeArray = this.state.results.concat(storedRoute);
    localStorage.setItem('routes-all', JSON.stringify(routeArray));
    this.setState({results: routeArray})
  }


  onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

  render() {
    const services = (this.props.routes[0] ? this.props.routes[0].trainServices : null);
    const result = JSON.parse(localStorage.getItem("routes"))
    // console.log('result!!!!', result)
    console.log('results', this.state.results);
    return (
      <div className='panel'>

          <form onSubmit={this.handleSubmitForm} className='form-search'>
            <div className='input-search'>
            <label>From</label>
            <input onChange={this.onChange} value={this.state.startingPoint} name='startingPoint'/>
            </div>
            <div className='input-search'>
            <label>To</label>
            <input onChange={this.onChange} value={this.state.destination} name='destination'/>
            </div>
            <button className='btn' type='sumbit'>Search!</button>
          </form>

      <div className='result'> <Result services={services} /></div>
      <div>{this.state.results.map(result => {
        return <p>{result.startingPoint} - {result.destination}</p>
      })}</div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state=', state);
  return {
    routes: state.fetchRoutes,
    crsCode: state.fetchCrsCode
  }
}

export default connect(mapStateToProps, actions)(Search)
