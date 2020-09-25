import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/profile';
import {
  addFriendRequest,
  removeFriendStart,
  fetchFriends,
} from '../actions/friend';
import { apiurls } from '../helpers/API-URL';
class User extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile(this.props.match.params.userid));
  }
  // componentWillUnmount() {
  //   this.props.dispatch(removeProfile());
  // }
  checkIfUserIsAfriend = () => {
    const { friends } = this.props.friends;
    const { _id: id } = this.props.profile.user;
    if (this.props.profile.inProgress) {
      return false;
    }
    const index = friends.map((friend) => friend.to_user._id).indexOf(id);
    return index === -1 ? false : true;
  };
  addFriend = () => {
    console.log(this.props.profile.user._id);
    this.props.dispatch(addFriendRequest(this.props.profile.user._id));
  };
  removeFriend = async () => {
    const userid = this.props.profile.user._id;
    const url = apiurls.removeFriend(userid);
    this.props.dispatch(removeFriendStart());
    const object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.token}`,
      },
    };
    const response = await fetch(url, object);
    await response.json();
    this.props.dispatch(fetchFriends());
  };
  render() {
    const { user, inProgress, error } = this.props.profile;
    const { addFriendsStart, removingFriendStart } = this.props.friends;
    if (inProgress) {
      return <div>Fetching Profile ...</div>;
    }
    if (error !== null) {
      return <div>{error}</div>;
    }
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        {addFriendsStart && (
          <div className="alert success-dailog">Adding Friend</div>
        )}
        {removingFriendStart && (
          <div className="alert success-dailog">Removing Friend</div>
        )}
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>
        <div className="btn-grp">
          {this.checkIfUserIsAfriend() ? (
            <button className="button save-btn" onClick={this.removeFriend}>
              Remove Friend
            </button>
          ) : (
            <button className="button save-btn" onClick={this.addFriend}>
              Add Friend
            </button>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profile,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(User);
