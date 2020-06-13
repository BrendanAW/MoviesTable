import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import Like from "./common/like.jsx";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete(id) {
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  }

  render() {
    const { length: count } = this.state.movies;
    return (
      <>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Like</th>
              <th>{this.renderQtyMovies()}</th>
            </tr>
          </thead>
          <tbody>{this.renderTags()}</tbody>
        </table>
      </>
    );
  }

  renderQtyMovies() {
    if (this.state.movies.length === 0)
      return <th>There are no movies in the database</th>;
    return <th>{this.state.movies.length}</th>;
  }

  setHeart(isFavorite) {
    if (isFavorite) return "fa fa-heart-o";
    else return "fa fa-heart";
  }

  switchFavorite = (movie) => {
    const movies = this.state.movies;
    movie.favorite = !movie.favorite;
    this.setState({ movies });
  };

  renderTags() {
    return this.state.movies.map((movie, index) => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => this.switchFavorite(movie)}
            >
              <i
                className={movie.favorite ? "fa fa-heart" : "fa fa-heart-o"}
                aria-hidden="true"
              ></i>
            </button>
          </td>
          <td>
            <button
              onClick={() => this.handleDelete(movie._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
}

export default Movies;
