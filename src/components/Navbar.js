import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { apiurls } from '../helpers/API-URL';
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      searchResults: [],
      searchSucess: null,
    };
  }

  logout = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logout());
  };
  handleSearch = async (e) => {
    if (e.key === 'Enter') {
      const { content } = this.state;
      if (content === '') {
        return;
      }
      console.log('Pressed Enter');
      const url = apiurls.searchProfile(content);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        this.setState({
          content: '',
          searchResults: data.data.users,
          searchSucess: true,
        });
      }
    }
  };
  searchText = (e) => {
    this.setState({
      content: e.target.value,
      searchResults: [],
      searchSucess: false,
    });
  };
  searchSuccessfull = () => {
    this.setState({
      searchResults: [],
      searchSucess: false,
    });
  };
  render() {
    const { isLoggedIn, user } = this.props.auth;
    const { searchResults, searchSucess } = this.state;
    const length = searchResults.length;
    console.log(searchResults);
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              // src="https://cdn-images-1.listennotes.com/podcasts/socials-lifestyle-socials-lifestyle--7xqPjZ9Dn1-9fAUE5qJFKt.1400x1400.jpg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input
            placeholder="Search Socials"
            onChange={this.searchText}
            onKeyUp={this.handleSearch}
            value={this.state.content}
          />

          {searchSucess && (
            <div className="search-results" onClick={this.searchSuccessfull}>
              {length === 0 ? (
                <ul>
                  <li className="search-results-row">
                    <span>No Users Found</span>
                  </li>
                </ul>
              ) : (
                <ul>
                  {searchResults.map((user) => (
                    <Link to={`/user/${user._id}`}>
                      <li className="search-results-row">
                        <img
                          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                          alt="user-dp"
                        />
                        <span>{user.email} | </span>
                        <span>{user.name}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="right-nav">
          {isLoggedIn && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{user.name}</span>
            </div>
          )}
          <div className="nav-links">
            {isLoggedIn ? (
              <ul>
                <li onClick={this.logout}>Log Out</li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);
