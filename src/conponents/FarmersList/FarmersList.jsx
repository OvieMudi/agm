import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FarmerListItem from './FarmerListItem/FarmerListItem';
import Axios from 'axios';
import Paginaton from '../Pagination/Pagination';

class FarmersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmers: [],
      imageBaseUrl: '/',
      limit: 30,
      currentPage: 1,
      totalPages: 1
    };
  }

  fetchServer = (limit, currentPage) => {
    return Axios.get(
      `https://theagromall.com/api/v2/get-sample-farmers?limit=${limit}&page=${currentPage}`
    );
  };

  componentDidMount() {
    this.fetchServer(this.state.limit, this.state.currentPage)
      .then(res => {
        const { farmers, imageBaseUrl, totalRec } = res.data.data;
        this.setState(prevState => ({
          ...prevState,
          farmers,
          imageBaseUrl,
          totalPages: Math.ceil(totalRec / this.state.limit)
        }));
      })
      .catch(err => {
        console.log('[Connection error]', err.message);
      });
    // set current page state to url query
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.fetchServer(this.state.limit, this.state.currentPage)
        .then(res => {
          const { farmers } = res.data.data;
          this.setState(prevState => ({
            ...prevState,
            farmers
          }));
        })
        .catch(err => {
          console.log('[Connection error]', err.message);
        });
    }
  }

  setPageHandler = event => {
    let currentPage = this.state.currentPage;
    if (event.target.type === 'nextItem') {
      currentPage += 1;
    } else if (event.target.type === 'prevItem') {
      currentPage -= 1;
    } else {
      currentPage = Number(event.target.textContent);
    }
    event.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      currentPage: currentPage >= 1 ? currentPage : 1
    }));
    const path = this.props.match.path;
    this.props.history.push(`${path}?page=${currentPage}`);
  };

  render() {
    // console.log(this.state.currentPage, this.state.totalPages);

    console.log(
      this.state.limit,
      this.state.currentPage,
      this.state.totalPages
    );

    const farmersList = this.state.farmers.length ? (
      <main className="ui container centered cards">
        {this.state.farmers.map(farmer => (
          <FarmerListItem
            key={farmer.farmer_id}
            farmer={farmer}
            imageBaseUrl={this.state.imageBaseUrl}
          />
        ))}
        <Paginaton
          setPage={this.setPageHandler}
          totalPages={this.state.totalPages}
          currentPage={this.state.currentPage}
          history={this.props.history}
        />
      </main>
    ) : (
      <main>Loading...</main>
    );

    return farmersList;
  }
}

export default withRouter(FarmersList);
