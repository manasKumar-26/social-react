import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Friend extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch(fetchFriends());
  // }
  render() {
    const { friends, inProgress } = this.props.friends;
    console.log(friends, inProgress);
    if (inProgress) {
      return (
        <div className="friends-list">
          <div className="header">Friends</div>
          <div className="no-friends">Fetching ...</div>
        </div>
      );
    }
    return (
      <div className="friends-list">
        <div className="header">Friends</div>

        {friends && friends.length === 0 && (
          <div className="no-friends">No friends !</div>
        )}
        {friends && (
          <div className="friend-scroll">
            {friends.map((friend) => {
              console.log(friend);
              return (
                <div>
                  <Link
                    className="friends-item"
                    to={`/user/${friend.to_user._id}`}
                  >
                    <div className="friends-img">
                      <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                      />
                    </div>
                    <div className="friends-name">{friend.to_user.name}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(Friend);
