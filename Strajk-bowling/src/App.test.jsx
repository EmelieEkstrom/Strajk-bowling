import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import BookingInfo from './components/BookingInfo/BookingInfo';
import Confirmation from './components/Confirmation/Confirmation';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

describe('bookingInfo', () => {
  it('renders BookingInfo labels', () => {
    render(<BookingInfo updateBookingDetails={() => {}} />);
    expect(screen.getByText(/date/i)).toBeInTheDocument();
    expect(screen.getByText(/time/i)).toBeInTheDocument();
    expect(screen.getByText(/number of awesome bowlers/i)).toBeInTheDocument();
    expect(screen.getByText(/number of lanes/i)).toBeInTheDocument();
  });

  it('Confirmation shows no-booking message when inactive', () => {
    render(<Confirmation confirmationDetails={{}} setConfirmation={() => {}} />);
    expect(screen.getByText(/inga bokning/i)).toBeInTheDocument();
  });

  it('ErrorMessage displays guidance text', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/fill out all the fields/i)).toBeInTheDocument();
  });
});

