import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';
 
const errorMessage = 'This is an error message';
const setup = (props: {message: string}) => render(<ErrorMessage {...props} />);

it('should render error message passed as props', async () => {
  const { container } = setup({ message: errorMessage });

  const message = screen.getByText(/^This is an error message$/i); // full string match, ignore case

  expect(message).toBeInTheDocument();
  expect(message).toHaveTextContent(errorMessage);

  expect(container).toMatchSnapshot();
});