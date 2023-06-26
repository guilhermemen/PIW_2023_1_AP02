import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"


import { Cadastrar, Listar, Editar, MyMenu } from "./Componentes"

const MainPage = () => {
    return (
        <BrowserRouter>
            <MyMenu />
            <Container sx={{mt:12}}>
                <Routes>
                    <Route path="cadastrarProfessor" element={<Cadastrar/>}/>
                    <Route path="listarProfessor" element={<Listar/>}/>
                    <Route path="editarProfessor/:id" element={<Editar/>}/>
                </Routes>     
            </Container>
        </BrowserRouter>
    )
}
export default MainPage