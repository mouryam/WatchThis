import React, { Component } from 'react';
import Card from './Card';
import LoaderButton from "./utils/LoaderButton";
import { invokeApig } from "./libs/awsLib";


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieID: this.props.movieID, // set initital load movie - Interstellar
      isToggleOn: true
    }
  }

  handleClick = async event => {
    event.preventDefault();
    try {
      await this.addToList({
        content: this.state
      });
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }

}

  addToList(movieID) {
    return invokeApig({
      path: "/list",
      method: "POST",
      body: movieID
    });
  }

  render() {
    return (
      <div>
          <Card data={this.state} className="container"/>
          <button
            onClick={this.handleClick.bind(this)}
            disabled={!this.state.isToggleOn}
          >{this.state.isToggleOn ? "Add to list" : "Added!"}</button>
      </div>
    )
  } // END render


  // the api request function
  fetchApi(url) {

    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path
      })
    })

    // .catch((err) => console.log('Movie not found!'))

  } // end function

  async componentDidMount() {
    this.getData(this.state.movieID)
    this.setState({isToggleOn: true})
  } // end component did mount function

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps.movieID)
    this.setState({isToggleOn: true})
  }

  getData(movieID){
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)
  }

  // } // END CLASS - APP
}
module.exports = Home;
