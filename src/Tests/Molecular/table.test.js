import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Table from "../../Components/Molecular/Table/index.js"
import MyContextProvider from "../../Context/index.js"
import { BrowserRouter } from "react-router-dom";
    
let rendered
const params = {rows: [
    {id: 1, tipo: "Tipo 1", titulo_trabalho: "Título 1", autor: "Autor 1", data_realizacao: "2021-12-15 19:00:15", local: "Local 1"},
    {id: 2, tipo: "Tipo 2", titulo_trabalho: "Título 2", autor: "Autor 2", data_realizacao: "2021-12-17 19:00:15", local: "Local 2"},
    {id: 3, tipo: "Tipo 3", titulo_trabalho: "Título 3", autor: "Autor 3", data_realizacao: "2021-12-18 19:00:15", local: "Local 3"}
]}

describe('when the Table is rendered', () => {
    beforeEach(() => {             
        rendered = render(
            <BrowserRouter>
                <MyContextProvider>
                    <Table rows={params.rows} />
                </MyContextProvider>
            </BrowserRouter>
        )
    })

    it('should render column names', () => {
        expect(rendered.getByText("Defesa")).toBeVisible()
        expect(rendered.getByText("Título do Trabalho")).toBeVisible()
        expect(rendered.getByText("Autor")).toBeVisible()
    })
    
    // it('should render the table itens', () => {
    //     expect(rendered.getByText("Título 1")).toBeVisible()
    //     expect(rendered.getByText("Local 2")).toBeVisible()
    //     expect(rendered.getByText("2021-12-18 19:00:15")).toBeVisible()
    // })
})