import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingInfo from './BookingInfo';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

describe('BookingInfo', () => {
  it('renders the booking form labels', () => {
    render(<BookingInfo updateBookingDetails={() => {}} />);
    expect(screen.getByText(/date/i)).toBeInTheDocument();
    expect(screen.getByText(/time/i)).toBeInTheDocument();
    expect(screen.getByText(/number of awesome bowlers/i)).toBeInTheDocument();
    expect(screen.getByText(/number of lanes/i)).toBeInTheDocument();
  });

  it('calls updateBookingDetails when inputs change', () => {
    const updateBookingDetails = vi.fn();
    const { container } = render(<BookingInfo updateBookingDetails={updateBookingDetails} />);

    const whenInput = container.querySelector('input[name="when"]');
    const timeInput = container.querySelector('input[name="time"]');
    const peopleInput = container.querySelector('input[name="people"]');
    const lanesInput = container.querySelector('input[name="lanes"]');

    fireEvent.change(whenInput, { target: { value: '2024-05-30' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    fireEvent.change(peopleInput, { target: { value: '8' } });
    fireEvent.change(lanesInput, { target: { value: '2' } });

    expect(updateBookingDetails).toHaveBeenCalledTimes(4);
  });
});

describe('ErrorMessage', () => {
  it('renders the error message text', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/fill out all the fields/i)).toBeInTheDocument();
  });
});
