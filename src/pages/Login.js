import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';
import LoginImg from '../Img/logoTrybe Wallet.png';
import bankImg from '../Img/bankImg.jpg';
import '../allCss/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onInputchange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateButton = () => {
    const { email, password } = this.state;

    const correctForm = email.includes('@' && '.com');
    const number = 6;
    const minCaratcter = password.length >= number;

    return correctForm && minCaratcter;
  };

  attReducerAndRedirect = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(addEmail(email));

    history.push('/carteira');
  };

  render() {
    return (
      <div className="allLogin">
        <div className="wallpaper">
          <img src={ bankImg } alt="bank Img" className="bankImg" />
        </div>
        <div className="login">
          <img src={ LoginImg } alt="Login img" className="loginImg" />
          <form className="form">
            <input
              className="inputsTexts"
              name="email"
              type="email"
              data-testid="email-input"
              placeholder="E-mail:"
              onChange={ this.onInputchange }
              required
            />
            <input
              className="inputsTextss"
              name="password"
              type="password"
              data-testid="password-input"
              placeholder="Senha:"
              onChange={ this.onInputchange }
            />
            <button
              className="enterButton"
              type="button"
              onClick={ this.attReducerAndRedirect }
              disabled={ !this.validateButton() }
            >
              Entrar
            </button>
          </form>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
