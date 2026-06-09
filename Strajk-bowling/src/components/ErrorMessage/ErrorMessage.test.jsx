import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    render(<ErrorMessage />);
    const errorMessageElement = screen.getByText(/Fill out all the fields and make sure that people and shoes is the same number./i);
    expect(errorMessageElement).toBeInTheDocument();
  });
});