import { decribe, it, expect } from 'vitest'; 
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { BookingInfo } from './components/BookingInfo/BookingInfo';
import { Confirmation } from './components/Confirmation/Confirmation';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';


describe('App', () => {
  it('should render the booking form', async () => {
    render(<BookingInfo />);
    
     await waitFor(() => {
      const Booking = screen.getAllByText('Min bokning'); 
  });
});

it('should add a date', async () => {
  render(<App />); 
})

  await waitFor(() =>{
    expect(screen.queryByText('Inga bokningar')).not.toBeInTheDocument(); 
  });

  const dateItemsBefore = screen.getAllByRole('listitem'); 

  const dateInput = screen.getByRole('textbox'); 
  fireEvent.change(dateInput, {
    target: {value: 'Testa' },
  }); 

  const dateInput = screen.getByRole('input'); 
  fireEvent.click(dateInput);

      expect(screen.getByAllRole('listitem').length).toBeGreaterThan(
      dateInputBefore.length
      );
});
          
 
  test('shows confirmation message on successful booking', () => {
    render(<Confirmation />);
    
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/players/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/shoes/i), { target: { value: '' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    
    expect(screen.getByText(/booking confirmed!/i)).toBeInTheDocument();
  });

  test('shows error message on incomplete booking form', () => {
    render(<ErrorMessage />);
    
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/players/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    
    expect(screen.getByText(/please fill in all fields correctly./i)).toBeInTheDocument();
  });

  test('shows error message for invalid number of players', () => {
    render(<ErrorMessage />);
    
    fireEvent.change(screen.getByLabelText(/players/i), { target: { value: '-1' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '2' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    
    expect(screen.getByText(/please fill in all fields correctly./i)).toBeInTheDocument();
  });

  test('shows error message for invalid number of lanes', () => {
    render(<BookingInfo />);
    
    fireEvent.change(screen.getByLabelText(/players/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/lanes/i), { target: { value: '0' } });
    
    fireEvent.click(screen.getByRole('button', { name: /book/i }));
    
    expect(screen.getByText(/please fill in all fields correctly./i)).toBeInTheDocument();
  });

