import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import CrsCode from '../constants'
import Result from '../Result'

const noop = () => {};

export class Search extends Component {
  state = {
    value: '',
    results: [],
    show: false,
    startingPoint: '',
    destination: ''
  }

  static propTypes = {
    items: PropTypes.array,
    crsCode: PropTypes.array,
    fetchCrsCode: PropTypes.func,
    fetchRoutes: PropTypes.func
  }

  static defaultProps = {
    items: [],
    crsCode: [],
    fetchCrsCode: noop,
    fetchRoutes: noop,
  }

  componentDidMount() {
    const storedRoutes = localStorage.getItem('routes-all');
    if(storedRoutes){
      this.setState({results: JSON.parse(storedRoutes)});
    }
    this.props.fetchCrsCode();
  }

  findCrsSuggestionsByName = (name = '') => {
    const {crsCodes} = this.props
    const nameFormatted = name.toLowerCase();
    if (crsCodes) {
      return crsCodes.filter((code) => {
        return code.stationName.toLowerCase() === nameFormatted;
      });
    } else {
      return [];
    }
  }

  saveDestinations = (destinations) => {
    localStorage.setItem('routes', JSON.stringify(destinations));
  }
  appendRouteHistory = (destinations) => {
    this.saveDestinations(destinations);

    const { results } = this.state
    const routeHistory = results.concat(destinations);

    localStorage.setItem('routes-all', JSON.stringify(routeHistory));
    return routeHistory;
  }

  getJourneyCrs = () => {
    const { startingPoint, destination } = this.state
    const startingPointCrs = this.findCrsSuggestionsByName(startingPoint);
    const destinationCrs = this.findCrsSuggestionsByName(destination);

    return {
      startCrsCode: startingPointCrs[0] && startingPointCrs[0].crsCode,
      endCrsCode: destinationCrs[0] && destinationCrs[0].crsCode
    }
  }

  handleSubmitForm = event => {
    event.preventDefault();
    const { startingPoint, destination } = this.state;
    const { startCrsCode, endCrsCode } = this.getJourneyCrs();

    if (startCrsCode && endCrsCode) {
      this.props.fetchRoutes(startCrsCode, endCrsCode);

      this.setState({
        results: this.appendRouteHistory({startingPoint, destination}),
        startingPoint: '',
        destination: ''
      });
    }



  }


  onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    onClick = () => {
      this.setState({show: !this.state.show})
    }

  render() {
    const services = (this.props.routes ? this.props.routes.trainServices : null);
    const result = JSON.parse(localStorage.getItem("routes"))
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
            <button className='btn-result' onClick={this.onClick} >{this.state.show ? 'Close' : 'Last Research'}</button>
          </form>
          <div className='result'>
          {services && <Result services={services} />}
          {!services && <p>No services available.</p>}
          </div>

          {this.state.show ?
              <div className='stored-item'>{this.state.results.map((result,i) => {
                return <p key={i}>{result.startingPoint} - {result.destination}</p>
              })}</div>
             : ''
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    routes: state.fetchRoutes.routes,
    crsCodes: state.fetchCrsCode.crsCodes
  }
}

export default connect(mapStateToProps, actions)(Search)
