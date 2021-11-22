import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Header from "../../Components/Molecular/Header/index.js"
import MyContextProvider from "../../Context/index.js"
import { BrowserRouter } from "react-router-dom";
    
let rendered

describe('when the Header is rendered', () => {
    beforeEach(() => {                
        rendered = render(
            <BrowserRouter>
            <MyContextProvider>
                <Header />
            </MyContextProvider>
            </BrowserRouter>
        )
    })
    
    it('should render sisdef logo', () => {
        expect(rendered.container.querySelector(".logo")).toBeVisible()
    })

    it('should render login input', () => {
        expect(rendered.getByTestId("username-input")).toBeVisible()
    })

    it('should render password input', () => {
      expect(rendered.getByTestId("password-input")).toBeVisible()
    })

    it('should render login button', () => {
        expect(rendered.queryByText("Entrar")).toBeVisible()
    })
})