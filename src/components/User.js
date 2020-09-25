import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile, removeProfile } from '../actions/profile';
class User extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile(this.props.match.params.userid));
  }
  componentWillUnmount() {
    this.props.dispatch(removeProfile());
  }
  render() {
    const { user, inProgress } = this.props.profile;
    if (inProgress) {
      return <div>Fetching Profile ...</div>;
    }
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>
        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}
export default connect(mapStateToProps)(User);
