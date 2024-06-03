import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import BookingInfo from '../BookingInfo/BookingInfo';

import Confirmation from './Confirmation'; 

describe('Confirmation', () => {
    it('should display booking confirmation', async () => {
        render(
            <Confirmation
                when='28/5'
                who= 'Emelie'
                lanes='2'
                number= '26'
                price='260'
                setAmount={() => {}}
                amount={0}
            />);
});
    
        <BookingInfo confirm={confirmationDetails} showImage={true} />

        const imgElem = screen.getByRole('img','presentation');
        const headingElems = screen.getAllByRole('heading'); 
        const Confirmation = screen.getByRole('confirmation-details'); 

        expect(imgElem.src).toBe(<img src= 'strajk-logo.svg'/>);
        expect(headingElems[0].textContent).toBe('text')
  
});       
