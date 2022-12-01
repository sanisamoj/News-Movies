import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'


export default function Favoritos () {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        const minhaLista = localStorage.getItem("@newsMovies")
        setFilmes( JSON.parse(minhaLista) || [] )
        return;

    }, [])


    function excluirFilme (id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem( '@newsMovies', JSON.stringify( filtroFilmes ) )
        toast.success("Filme excluído!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    }

    
    console.log(filmes)

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes Favoritos</h1>

            {filmes.length === 0 && <span>Você ainda não possui filmes Salvos  :( </span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key = { item.id }>
                            <span>{item.title}</span>

                            <div>
                                <Link to = {`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={ () => excluirFilme(item.id) }>Excluir</button>
                            </div>

                        </li>
                    )
                })}
            </ul>

        </div>
    )
}