import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

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
      <form onSubmit={ this.redirectToWallet }>
        Email:
        <input
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="Digite seu Email:"
          onChange={ this.onInputchange }
          required
        />
        Senha:
        <input
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha:"
          onChange={ this.onInputchange }
        />
        <button
          type="button"
          onClick={ this.attReducerAndRedirect }
          disabled={ !this.validateButton() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
