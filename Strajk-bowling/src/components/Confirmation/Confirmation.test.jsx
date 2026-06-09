import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Confirmation from './Confirmation';

describe('Confirmation', () => {
  it('should render "Inga bokning gjord!" when no active booking', () => {
    render(
      <Confirmation 
        confirmationDetails={{}} 
        setConfirmation={() => {}} 
      />
    );
    
    expect(screen.getByText(/inga bokning gjord!/i)).toBeInTheDocument();
  });

  it('should display booking details when active', () => {
    const confirmationDetails = {
      active: true,
      when: '2024-06-09T18:00',
      people: '4',
      lanes: '2',
      id: '12345',
      price: '1040'
    };

    render(
      <Confirmation 
        confirmationDetails={confirmationDetails} 
        setConfirmation={() => {}} 
      />
    );

    expect(screen.getByDisplayValue('2024-06-09 18:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
    expect(screen.getByText(/1040 sek/)).toBeInTheDocument();
  });

  it('should display correct heading when active', () => {
    const confirmationDetails = {
      active: true,
      when: '2024-06-09T18:00',
      people: '4',
      lanes: '2',
      id: '12345',
      price: '1040'
    };

    render(
      <Confirmation 
        confirmationDetails={confirmationDetails} 
        setConfirmation={() => {}} 
      />
    );

    expect(screen.getByText(/see you soon!/i)).toBeInTheDocument();
  });

  it('should call setConfirmation with empty object when button is clicked', () => {
    const setConfirmation = vi.fn();
    const confirmationDetails = {
      active: true,
      when: '2024-06-09T18:00',
      people: '4',
      lanes: '2',
      id: '12345',
      price: '1040'
    };

    render(
      <Confirmation 
        confirmationDetails={confirmationDetails} 
        setConfirmation={setConfirmation} 
      />
    );

    const button = screen.getByRole('button', { name: /sweet, let's go!/i });
    fireEvent.click(button);

    expect(setConfirmation).toHaveBeenCalledWith({});
  });

  it('should render form elements with disabled attribute', () => {
    const confirmationDetails = {
      active: true,
      when: '2024-06-09T18:00',
      people: '4',
      lanes: '2',
      id: '12345',
      price: '1040'
    };

    render(
      <Confirmation 
        confirmationDetails={confirmationDetails} 
        setConfirmation={() => {}} 
      />
    );

    const inputs = screen.getAllByDisplayValue(/.+/);
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });
});
