import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Shoes from './Shoes';

describe('Shoes', () => {
    it('calls addShoe when + button is clicked', () => {
        const addShoe = vi.fn();
        render(
            <Shoes updateSize={() => {}} addShoe={addShoe} removeShoe={() => {}} shoes={[]} />
        );

        const addButton = screen.getByText('+');
        fireEvent.click(addButton);

        expect(addShoe).toHaveBeenCalled();
    });

    it('renders shoe inputs and calls updateSize and removeShoe', () => {
        const updateSize = vi.fn();
        const removeShoe = vi.fn();
        const shoes = [{ id: 's1' }];

        const { container } = render(
            <Shoes updateSize={updateSize} addShoe={() => {}} removeShoe={removeShoe} shoes={shoes} />
        );

        const input = container.querySelector('input[name="s1"]');
        expect(input).toBeTruthy();

        fireEvent.change(input, { target: { value: '42' } });
        expect(updateSize).toHaveBeenCalled();

        const minusButton = screen.getByText('-');
        fireEvent.click(minusButton);
        expect(removeShoe).toHaveBeenCalledWith('s1');
    });

    it('renders correct labels for each shoe input', () => {
        const shoes = [
            { id: 's1', size: '' },
            { id: 's2', size: '' },
        ];

        render(
            <Shoes updateSize={() => {}} addShoe={() => {}} removeShoe={() => {}} shoes={shoes} />
        );

        expect(screen.getByText(/shoe size \/ person 1/i)).toBeInTheDocument();
        expect(screen.getByText(/shoe size \/ person 2/i)).toBeInTheDocument();
    });

    it('calls updateSize with valid 2-digit shoe sizes (37-46)', () => {
        const updateSize = vi.fn();
        const shoes = [{ id: 's1', size: '' }];

        const { container } = render(
            <Shoes updateSize={updateSize} addShoe={() => {}} removeShoe={() => {}} shoes={shoes} />
        );

        const input = container.querySelector('input[name="s1"]');
        expect(input).toBeTruthy();

        fireEvent.change(input, { target: { value: '40' } });
        expect(updateSize).toHaveBeenCalled();
    });
});
