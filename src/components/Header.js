import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          {' '}
          { email }
          {' '}
        </p>
        <p data-testid="total-field">
          despesas: 0
        </p>
        <p data-testid="header-currency-field"> BRL </p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  wallet: globalState.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
