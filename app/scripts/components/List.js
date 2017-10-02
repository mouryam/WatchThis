import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { invokeApig } from "./libs/awsLib";
import Card from './Card';
import Routes from "../Routes";
import RouteNavItem from "./utils/RouteNavItem";


export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isDeleting: false,
      movies: [],
    };
    this.onClick = this.handleDelete.bind(this);

  }

  deleteFromList(id) {
    console.log("Deleting "+id+" from the list..")
    return invokeApig({
      path: `/list/`+id,
      method: "DELETE"
    });
  }

  handleDelete = async event => {
    const {id} = event.target;
    this.setState({ isLoading: false });

    try {
      await this.deleteFromList(id);
      try {
        const results = await this.movies();
        this.setState({ movies: results });
      } catch (e) {
        alert(e);
      }
      this.setState({ isLoading: false });
    } catch (e) {
        alert(e);
        this.setState({ isDeleting: false });
      }
  }



  renderCheckMovies(movies) {
    if(movies.length>0){
      console.log(movies)
      return this.renderMovie(movies)
    }
    else {
      return(
        <h2>No movies here...</h2>
      )
    }
  }
  renderMovie(movieInformation){
    console.log(movieInformation)
    return [].concat(movieInformation).map(
      (movie, i) =>
      <div className="image-area" key={movie.content.movieID+"area"}>
        <Card data={movie.content} key={movie.content.movieID} className="container"/>
        <div className="remove-image" key={movie.content.movieID+"remove"} id={movie.assetId} onClick={this.onClick}
          style={{display: "inline"}}>&#215;</div>

      </div>
    );
  }

  renderMovieList() {
    return (
      <div className="movies">
        <h4>Your Movies</h4>
        <ListGroup>
          {!this.state.isLoading && this.renderCheckMovies(this.state.movies)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="List">
        {this.renderMovieList()}
      </div>
    );
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const results = await this.movies();
      this.setState({ movies: results });
    } catch (e) {
      alert(e);
    }
    console.log(this.state.movies)
    this.setState({ isLoading: false });
  }

  movies() {
    return invokeApig({ path: "/list" });
  }
}
