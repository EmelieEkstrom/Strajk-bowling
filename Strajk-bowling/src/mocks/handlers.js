import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
    async ({ request }) => {
      const body = await request.json();
      
      // Calculate price: 120 kr per person + 100 kr per lane
      const price = parseInt(body.people) * 120 + parseInt(body.lanes) * 100;
      
      return HttpResponse.json({
        active: true,
        id: Math.floor(Math.random() * 100000),
        when: body.when,
        people: body.people,
        lanes: body.lanes,
        shoes: body.shoes,
        price: price,
      }, { status: 201 });
    }
  ),
];
