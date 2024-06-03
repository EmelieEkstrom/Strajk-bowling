import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from './BookingInfo';
import ErrorMessage from './BookingInfo'; 

describe('BookingInfo', () => {
  it ('renders the booking form', () => {
    render(<BookingInfo updateBookingDetails={ () => {} } />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument('2024-05-30');
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument('18:00' );
    expect(screen.getByLabelText(/people/i)).toBeInTheDocument('8');
    expect(screen.getByLabelText(/lanes/i)).toBeInTheDocument('2');
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument('Emelie');
    expect(screen.getByRole('button', { name: /book/i })).toBeInTheDocument('');
  });

  test('shows confirmation message on successful booking', () => {
    render(<BookingInfo />);
    
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-05-30' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/people/i), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/name/i), {target: { value: 'Emelie' } }); 
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    
    expect(BookingInfo.insideDone).toBeCalled(); //sucess
    expect(BookingInfo.done).toBeCalled(); //failed
  });

  test('shows error message on incomplete booking form', () => {
    render(<BookingInfo />);
    
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-05-30' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/people/i), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '2' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    
    expect(screen.getByText(/please fill in all fields correctly./i)).toBeInTheDocument();
  });

  test('shows error message for invalid number of players', () => {
    render(<ErrorMessage />);
    
    fireEvent.change(screen.getByLabelText(/people/i), { target: { value: '-1' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '0' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    
    expect(screen.getByText(/please fill in all fields correctly./i)).toBeInTheDocument();
  });

  test('shows error message for invalid number of lanes', () => {
    render(<ErrorMessage />);
    
    fireEvent.change(screen.getByLabelText(/people/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '0' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    expect(screen.getByText(/please fill in all fields correctly./i)).toBeInTheDocument();
  });
});
