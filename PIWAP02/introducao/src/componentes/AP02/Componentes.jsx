import React from "react";
import { Paper, Box, TableContainer, TableHead, Typography, Table, TableBody, TableRow, TableCell,Menu } from "@mui/material"
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import axios from "axios";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppBar, Container, Toolbar } from "@mui/material"
import AdbIcon from "@mui/icons-material/Adb"
import { Link } from "react-router-dom"
import { useEffect } from "react";

const MyMenu = () => {

    const [anchoElProfessor,setAnchoElProfessor] = useState(null)

    const navigate = useNavigate()

    function handleOpenProfDropMenu(event) {
        setAnchoElProfessor(event.currentTarget)
    }

    function handleCloseProdDropMenu() {
        setAnchoElProfessor(null)
    }

    function profDropMenu() {
        return (
            <Box>
                <Button 
                    sx={{ color: "white", mt: 1 }}
                    onClick={handleOpenProfDropMenu}
                >
                    Alunos
                </Button>
                <Menu
                    anchorEl={anchoElProfessor}
                    open={Boolean(anchoElProfessor)}
                    onClose={handleCloseProdDropMenu}
                >
                    <MenuItem 
                        onClick={handleCloseProdDropMenu}
                        component={Link}
                        to="cadastrarProfessor"
                    >
                        Cadastrar
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseProdDropMenu}
                        component={Link}
                        to="listarProfessor"
                    >
                        Listar
                    </MenuItem>
                </Menu>
            </Box>
        )
    }

    return (
        <AppBar>
            <Container>
                <Toolbar>
                    <AdbIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                            textDecoration: "none",
                            color: "white",
                            fontFamily: "monospace",
                            fontWeight: 800,
                            letterSpacing: ".2rem"
                        }}
                    >
                        CRUD_V0
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        {profDropMenu()}
                        
                        <Button sx={{ color: "white", mt: 1 }}>
                            Sobre
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


const Cadastrar = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("0.0")

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        const aluno = { nome, curso, ira }
        axios.post("http://localhost:3001/alunos/cadastrar", aluno)
            .then(
                (response) => {
                    alert("Professor " + response.data._id + " adicionado com sucesso!")
                    navigate("/listarProfessor")
                }
            )
            .catch(error => console.log(error))
    }


    return (
        <>
            <Typography variant="h4" fontWeight="bold">
                Cadastrar Aluno
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label="Nome Completo"
                    name="nome"
                    onChange={(event) => setNome(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    label="Curso"
                    name="curso"
                    onChange={(event) => setCurso(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    label="IRA"
                    type="number"
                    name="curso"
                    onChange={(event) => setIra(event.target.value)}
                />
                
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2
                }}>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </>
    )
}


const Editar = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("0.0")
    
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {

            axios.get(`http://localhost:3001/alunos/recuperar/${id}`)
                .then(
                    (response) => {
                        setNome(response.data.nome)
                        setCurso(response.data.curso)
                        setIra(response.data.ira)
                    }
                )
                .catch(error => console.log(error))

        }
        ,
        []
    )

    function handleSubmit(event) {
        event.preventDefault()
        const professor = {nome,curso,ira}
        axios.put(`http://localhost:3001/alunos/atualizar/${id}`,professor)
        .then(
            (response) => {
                alert("Professor " + response.data.id + " atualizado com sucesso!")
                navigate("/listarProfessor")
            }
        )
        .catch(error=>console.log(error))
    }

    

    return (
        <>
            <Typography variant="h4" fontWeight="bold">
                Editar Aluno {nome}
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label="Nome Completo"
                    name="nome"
                    onChange={(event) => setNome(event.target.value)}
                    value={nome}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="curso"
                    label="Curso"
                    name="curso"
                    onChange={(event) => setCurso(event.target.value)}
                    value={curso}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="IRA"
                    label="IRA"
                    name="IRA"
                    type="number"
                    onChange={(event) => setIra(event.target.value)}
                    value={ira}
                />
                

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2
                }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mb: 2 }}
                    >
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </>
    )
}

const Listar = () => {

    const [professores,setProfessores] = useState([])
    const navigate = useNavigate()

    useEffect(
        ()=>{
            axios.get("http://localhost:3001/alunos/listar")
            .then(
                (response)=>{
                    //console.log(response)
                    setProfessores(response.data)
                }
            )
            .catch(error=>console.log(error))
        }
        ,
        []
    )

    function deleteProfessorById(id){
        if(window.confirm("Deseja Excluir? " + id)){
            axios.delete(`http://localhost:3001/alunos/remover/${id}`)
            .then(
                (response)=>{
                    const resultado = professores.filter( professor => professor._id != id)
                    setProfessores(resultado)
                }
            )
            .catch(error=>console.log(error))
        }
    }

    return (
        <>
            <Typography variant="h4" fontWeight="bold">
                Listar Alunos
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>IRA</StyledTableCell>
                            <StyledTableCell>AÇÕES</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            professores.map(
                                (professor) => {
                                    return (
                                        <StyledTableRow key={professor._id}>
                                            <StyledTableCell>{professor._id}</StyledTableCell>
                                            <StyledTableCell>{professor.nome}</StyledTableCell>
                                            <StyledTableCell>{professor.curso}</StyledTableCell>
                                            <StyledTableCell>{professor.ira}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box>
                                                    <IconButton aria-label="edit" component={Link} to={`/editarProfessor/${professor._id}`}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" onClick={()=>deleteProfessorById(professor._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export {Listar,Editar,Cadastrar,MyMenu}