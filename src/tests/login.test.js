import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Tests of Login component', () => {
  test('if the page renders the corrects texts', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/digite sua senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(button).toBeDisabled();

    userEvent.type(email, 'test@test.com');
    expect(email).toHaveValue('test@test.com');

    userEvent.type(password, '1234567');
    expect(password).toHaveValue('1234567');
    expect(button).not.toBeDisabled();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
