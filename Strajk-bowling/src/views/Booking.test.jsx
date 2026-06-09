import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import Booking from './Booking';

// Mock API
const server = setupServer(
  http.post(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
    async ({ request }) => {
      const body = await request.json();

      const price =
        parseInt(body.people) * 120 + parseInt(body.lanes) * 100;

      return HttpResponse.json(
        {
          active: true,
          id: 12345,
          when: body.when,
          people: body.people,
          lanes: body.lanes,
          shoes: body.shoes,
          price,
        },
        { status: 201 }
      );
    }
  )
);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(() => server.close());

describe('Booking', () => {
  it('renders booking form initially', () => {
    render(<Booking />);

    expect(
      screen.getByRole('heading', { level: 1, name: /booking/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/when, what & who/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /striiiiiike!/i })
    ).toBeInTheDocument();
  });

  it('shows error when booking with incomplete data', async () => {
    render(<Booking />);

    fireEvent.click(
      screen.getByRole('button', { name: /striiiiiike!/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/fill out all the fields/i)
      ).toBeInTheDocument();
    });
  });

  it('shows error when people exceed lane capacity', async () => {
    const { container } = render(<Booking />);

    fireEvent.change(container.querySelector('input[name="when"]'), {
      target: { value: '2024-06-09' },
    });

    fireEvent.change(container.querySelector('input[name="time"]'), {
      target: { value: '18:00' },
    });

    fireEvent.change(container.querySelector('input[name="people"]'), {
      target: { value: '10' },
    });

    fireEvent.change(container.querySelector('input[name="lanes"]'), {
      target: { value: '1' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: /striiiiiike!/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/fill out all the fields/i)
      ).toBeInTheDocument();
    });
  });

  it('calculates price correctly', async () => {
    const { container } = render(<Booking />);

    fireEvent.change(container.querySelector('input[name="when"]'), {
      target: { value: '2024-06-09' },
    });

    fireEvent.change(container.querySelector('input[name="time"]'), {
      target: { value: '18:00' },
    });

    fireEvent.change(container.querySelector('input[name="people"]'), {
      target: { value: '4' },
    });

    fireEvent.change(container.querySelector('input[name="lanes"]'), {
      target: { value: '2' },
    });

    const addButton = screen.getByText('+');

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    await waitFor(() => {
      const shoes = container.querySelectorAll('.shoes__input');
      expect(shoes.length).toBe(4);

      fireEvent.change(shoes[0], { target: { value: '40' } });
      fireEvent.change(shoes[1], { target: { value: '41' } });
      fireEvent.change(shoes[2], { target: { value: '42' } });
      fireEvent.change(shoes[3], { target: { value: '43' } });
    });

    fireEvent.click(
      screen.getByRole('button', { name: /striiiiiike!/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/680/i)).toBeInTheDocument();
    });
  });

  it('sends booking and shows confirmation screen', async () => {
    const { container } = render(<Booking />);

    fireEvent.change(container.querySelector('input[name="when"]'), {
      target: { value: '2024-06-09' },
    });

    fireEvent.change(container.querySelector('input[name="time"]'), {
      target: { value: '18:00' },
    });

    fireEvent.change(container.querySelector('input[name="people"]'), {
      target: { value: '2' },
    });

    fireEvent.change(container.querySelector('input[name="lanes"]'), {
      target: { value: '1' },
    });

    const addButton = screen.getByText('+');

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    await waitFor(() => {
      const shoes = container.querySelectorAll('.shoes__input');
      expect(shoes.length).toBe(2);

      fireEvent.change(shoes[0], { target: { value: '42' } });
      fireEvent.change(shoes[1], { target: { value: '38' } });
    });

    fireEvent.click(
      screen.getByRole('button', { name: /striiiiiike!/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/sweet/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/when, what & who/i)).not.toBeInTheDocument();
  });

  it('navigates back to booking form after confirmation', async () => {
    const { container } = render(<Booking />);

    fireEvent.change(container.querySelector('input[name="when"]'), {
      target: { value: '2024-06-09' },
    });

    fireEvent.change(container.querySelector('input[name="time"]'), {
      target: { value: '18:00' },
    });

    fireEvent.change(container.querySelector('input[name="people"]'), {
      target: { value: '2' },
    });

    fireEvent.change(container.querySelector('input[name="lanes"]'), {
      target: { value: '1' },
    });

    const addButton = screen.getByText('+');

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    await waitFor(() => {
      const shoes = container.querySelectorAll('.shoes__input');
      expect(shoes.length).toBe(2);

      fireEvent.change(shoes[0], { target: { value: '42' } });
      fireEvent.change(shoes[1], { target: { value: '38' } });
    });

    fireEvent.click(
      screen.getByRole('button', { name: /striiiiiike!/i })
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sweet/i })).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole('button', { name: /sweet/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/when, what & who/i)
      ).toBeInTheDocument();
    });
  });
});