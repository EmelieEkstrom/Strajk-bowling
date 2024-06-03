import { http, HttpResponse } from 'msw';

export const handlers = [
  
  http.post('https://jsonplaceholder.typicode.com/', () => {
  async ({request}) => {  

   await request.json();
   
   return HttpResponse.json( 
      {
        user: id,
        date: '2024-05-30',
        time: 18,
        people: 8,
        lanes: 2,
        done: 'success', 
      }
   );
    }   


export const handlers = [     
    http.get('https://jsonplaceholder.typicode.com/user' , () => {
        console.log(user);
        return HttpResponse.json({
                
                id: 1, 
                date: 2024-05-30,
                time: 18,
                people: 8,
                lanes: 2,
                done: sucess,
            },  
             
        )},
    ),    
      
    http.post('https://jsonplaceholder.typicode.com/user', () => {
        return HttpResponse.json({ success: true, message: 'Booking confirmed' 
    }),
});
