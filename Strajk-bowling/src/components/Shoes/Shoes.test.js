import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Input from '../Shoes/Shoes';

describe('Shoes', () => {
    it ('should be able to update shoe sizes', async () => {
        render(
            <Input                
                updateSize={() => {}}
                addShoe={() => {}}
                removeShoe={() => {}}
                shoes={[]}
            />  
        );    
            const addButton = screen.getByText("add-shoe"); 
            fireEvent.click(addButton); 
        

        const updateSize = screen.getByRole('button');
        fireEvent.click(updateSize); 
        
        const shoeInput = screen.getByRole('shoe-size');
        const headingElems = screen.getByRole('your-name');
        
        expect(className[0].textContent).toBe('38');
        expect(headingElems[1].textContent).toBe('Emelie'); 
        fireEvent.click(checkboxElem);
        fireEvent.click(checkboxElem);

    })
});