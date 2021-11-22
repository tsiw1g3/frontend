import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Footer from "../../Components/Molecular/Footer/index.js"
import MyContextProvider from "../../Context/index.js"
import { BrowserRouter } from "react-router-dom";
    
let rendered

describe('when the Footer is rendered', () => {
    beforeEach(() => {                
        rendered = render(
            <BrowserRouter>
            <MyContextProvider>
                <Footer />
            </MyContextProvider>
            </BrowserRouter>
        )
    })
    
    it('should render "Instituto de Computação"', () => {
        expect(rendered.getByText("INSTITUTO DE COMPUTAÇÃO")).toBeVisible()
    })

    it('should render the address', () => {
        expect(rendered.getByText("Avenida Adhemar de Barros, s/n - Campus de Ondina")).toBeVisible()
        expect(rendered.getByText("CEP: 40.170-110 Salvador-Bahia Telefone: 3283-6164")).toBeVisible()
    })

    it('should render the logos', () => {
        expect(rendered.getByRole("img")).toBeVisible()
    })
})
