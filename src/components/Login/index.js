import { Component } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import './index.css';

function LoginWrapper(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
    showErrorMsg: false,
    showPassword: false,
  };

  onSuccessLogin = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    const { navigate } = this.props;
    navigate('/');
  };

  onFailureLogin = (errorMsg) => {
    this.setState({ errorMsg, showErrorMsg: true });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    let { usernameInput, passwordInput } = this.state;

    if (usernameInput.toLowerCase().trim() === 'tarun') usernameInput = 'rahul';
    if (passwordInput === 'tarun@9849') passwordInput = 'rahul@2021';

    const userDetails = { username: usernameInput, password: passwordInput };
    const LoginApiUrl = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(LoginApiUrl, options);
    const data = await response.json();

    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token);
    } else {
      this.onFailureLogin(data.error_msg);
    }
  };

  updateUsername = (event) => this.setState({ usernameInput: event.target.value });

  updatePassword = (event) => this.setState({ passwordInput: event.target.value });

  toggleShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  renderUsernameField = () => {
    const { usernameInput } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="username" className="input-field-label">
          USERNAME
        </label>
        <input
          type="text"
          value={usernameInput}
          placeholder="tarun"
          id="username"
          onChange={this.updateUsername}
        />
      </div>
    );
  };

  renderPasswordField = () => {
    const { passwordInput, showPassword } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="password" className="input-field-label">
          PASSWORD
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={passwordInput}
          placeholder="tarun@9849"
          id="password"
          onChange={this.updatePassword}
        />
        <div className="show-password-container">
          <input
            type="checkbox"
            id="inputCheck"
            checked={showPassword}
            onChange={this.toggleShowPassword}
          />
          <label htmlFor="inputCheck" className="input-field-label">
            Show Password
          </label>
        </div>
      </div>
    );
  };

  render() {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }
    const { errorMsg, showErrorMsg } = this.state;

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <h1 className="logo">UNI Restro Cafe</h1>
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginWrapper;
