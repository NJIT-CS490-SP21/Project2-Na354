import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('If logged in check it dispeared', () => {
  const result = render(<App />);
  const LoginButton = screen.getByText('Add to List');
  expect(LoginButton).toBeInTheDocument();
  fireEvent.click(LoginButton);
  expect(LoginButton).not.toBeInTheDocument();
  
  
});

test('If reset button is pressed does the login screen appear', () => {
  const result = render(<App />);
  const LoginButton = screen.getByText('Add to List');
  expect(LoginButton).toBeInTheDocument();
  fireEvent.click(LoginButton);

  const Reset = screen.getByText('Reset Game');
  expect(Reset).toBeInTheDocument();
  fireEvent.click(Reset);
  expect(Reset).not.toBeInTheDocument();
});

test('LeaderBoard is pressed does names show up', () => {
  const result = render(<App />);
  const LoginButton = screen.getByText('Add to List');
  expect(LoginButton).toBeInTheDocument();
  fireEvent.click(LoginButton);
  const LeaderBoard = screen.getByText('LeaderBoard');
  expect(LeaderBoard).toBeInTheDocument();
  fireEvent.click(LeaderBoard);
  expect(LeaderBoard).toBeInTheDocument();
});
