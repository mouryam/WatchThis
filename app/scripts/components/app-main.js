import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import Routes from "../Routes";
import RouteNavItem from "./utils/RouteNavItem";
import SearchBox from './Search';
import { authUser, signOutUser } from "./libs/awsLib";

const TMDBLogo = 'https://www.themoviedb.org/assets/static_cache/27b65cb40d26f78354a4ac5abf87b2be/images/v4/logos/powered-by-rectangle-green.svg';
var childProps

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieID: 346364,// set initital load movie - It
      isAuthenticated: false,
      isAuthenticating: true,
      isMovieFound: false
    }
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  movieFound = found => {
    this.setState({ isMovieFound: found });
  }
  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");

  }

  render() {
    childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      movieID: this.state.movieID
    };
    return (
      !this.state.isAuthenticating &&
      <div className="col-md-12 search-container nopadding">
      <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
            <RouteNavItem key={1} href="/" title = "WatchThis"><img src={TMDBLogo} className="logo" alt="The Movie Database" /></RouteNavItem>
            </Navbar.Brand>
            <SearchBox fetchMovieID={this.fetchMovieID.bind(this)}/>
          </Navbar.Header>
          <Nav pullRight>
          {this.state.isAuthenticated
            ? [
                <NavItem key={4} onClick={this.handleLogout} className="navItem">Logout</NavItem>,
                <RouteNavItem key={5} href="/list" className="navItem">
                  My List
                </RouteNavItem>
              ]
            : [
                <RouteNavItem key={2} href="/signup" className="navItem">
                  Signup
                </RouteNavItem>,
                <RouteNavItem key={3} href="/login" className="navItem">
                  Login
                </RouteNavItem>
              ]}
          </Nav>
        </Navbar>
        <Routes childProps={childProps} />
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

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)
    this.props.history.push("/find/"+this.state.movieID);

  } // end function

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });

    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)

    //========================= BLOODHOUND ==============================//
    let suggests = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
        filter: function(movies) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.results, function(movie) {
            var year  = "("+movie.release_date.split("-")[0]+")"
            return {
              value: movie.original_title + " "+year, // search original title
              id: movie.id // get ID of movie simultaniously
            };
          });
        } // end filter
      } // end remote
    }); // end new Bloodhound

    suggests.initialize(); // initialise bloodhound suggestion engine

    //========================= END BLOODHOUND ==============================//

    //========================= TYPEAHEAD ==============================//
    // Instantiate the Typeahead UI
    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    }, {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
      this.fetchMovieID(datum.id)
    }.bind(this)); // END Instantiate the Typeahead UI
    //========================= END TYPEAHEAD ==============================//

  } // end component did mount function

  // } // END CLASS - APP
}
export default withRouter(App);
