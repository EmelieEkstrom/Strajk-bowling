import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage'; 

test('renders the error message', () => {
    render(<ErrorMessage />);
    const errorMessageElement = screen.getByText(/Please fill out all the fields./i );
    expect(errorMessageElement).toBeInTheDocument();
});