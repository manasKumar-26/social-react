import React from 'react';
import { connect } from 'react-redux';
import { clearAuth, editUser } from '../actions/auth';
class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.auth.user._id,
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
    };
  }
  handleChange = (fieldname, value) => {
    this.setState({
      [fieldname]: value, //VVI
    });
  };
  changeProfile = () => {
    const { id, name, password, confirmPassword } = this.state;
    this.props.dispatch(editUser(id, name, password, confirmPassword));
  };
  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }
  render() {
    const { user, error } = this.props.auth;
    const { editMode } = this.state;
    console.log(this.state);
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        {error && <div className="alert error-dailog">{error}</div>}
        {error === false && <div className="alert success-dailog">Updated</div>}
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name', e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">Password</div>
            <input
              type="password"
              onChange={(e) => this.handleChange('password', e.target.value)}
              value={this.state.password}
            />
          </div>
        )}
        {editMode && (
          <div className="field">
            <div className="field-label">Confirm-Password</div>
            <input
              type="password"
              onChange={(e) =>
                this.handleChange('confirmPassword', e.target.value)
              }
              value={this.state.confirmPassword}
            />
          </div>
        )}
        <div className="btn-grp">
          {editMode ? (
            <button
              className="button save-btn"
              onClick={() => this.changeProfile()}
            >
              Save
            </button>
          ) : (
            <button
              className="button edit-btn"
              onClick={(e) => this.handleChange('editMode', true)}
            >
              Edit Profile
            </button>
          )}
          {editMode && (
            <div
              className="go-back"
              onClick={(e) => this.handleChange('editMode', false)}
            >
              Back
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Setting);
