import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchEconomyApi } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEconomyApi());
  }

  render() {
    return (
      <>
        <div>TrybeWallet</div>
        <Header />
        <WalletForm />
      </>
    );
  }
}

export default connect()(Wallet);
