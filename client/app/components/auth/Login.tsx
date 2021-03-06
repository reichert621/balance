import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { login } from '../../helpers/auth';
import './Auth.less';

interface LoginProps {}

interface LoginState {
  email: string;
  password: string;
  error?: string;
}

class Login extends React.Component<
  LoginProps & RouteComponentProps<{}>,
  LoginState
> {
  constructor(props: LoginProps & RouteComponentProps<{}>) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  onUpdateInput(e: any) {
    return this.setState({
      [e.target.name]: e.target.value
    } as Pick<LoginState, keyof LoginState>);
  }

  handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    const { history } = this.props;
    const { email, password } = this.state;
    const credentials = {
      password,
      email: email.trim()
    };

    return login(credentials)
      .then(() => history.push('/dashboard'))
      .catch(err => {
        this.setState({ error: 'Invalid credentials' });
      });
  }

  render() {
    return (
      <div className="sign-in-wrapper">
        <div className="sign-in-container">
          <div className="sign-in-box">
            <div className="sign-in-header">
              <h4>Sign in to Balance</h4>
            </div>

            <form
              className="sign-in-form"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <div className="form-group">
                <input
                  type="email"
                  className="input-default full-width"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onUpdateInput.bind(this)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="input-default full-width"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onUpdateInput.bind(this)}
                />
              </div>
            </form>
          </div>

          <button
            className="btn-primary btn-sign-in"
            type="submit"
            onClick={this.handleSubmit.bind(this)}
          >
            Log in
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
