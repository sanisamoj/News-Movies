import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../Services/api';
import  './filme-info.css';
import { toast } from 'react-toastify'

function Filme() {
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loadind, setLoading] = useState(true);
    const navigate = useNavigate()


    useEffect(()=>{
        async function loadFilme(){
            await api.get('/movie/' + id, {
                params : { api_key: "e7765c0a8aae3b427ea689efba5a0668", language: 'pt-BR', page: 1, }
                
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigate("/", { replace : true })
                return;
            })
        }

        loadFilme()

        return () => {
            console.log("Componente foi desmontado")
        }


    }, [navigate, id])

    function salvarFilme() {
        
        const minhaLista = localStorage.getItem("@newsMovies")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.find((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn('Este filme já está na lista!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            return;
        }

        filmesSalvos.push(filme)
        localStorage.setItem('@newsMovies', JSON.stringify(filmesSalvos))
        toast.success("Filme Salvo!",
        {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            }
        )

    }


    if(loadind) {
        return(
            <div className='filme-info'>
                <h1>Acessando Filme...</h1>
            </div>
        )
    }


    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src = {`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt = {filme.title}  />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}> Salvar </button>
                <button>
                <a target = "blank"  rel = "external" href = { `https://youtube.com/results?search_query=${filme.title} Trailer` } > Trailer </a>
                </button>
            </div>


        </div>
    )
}

export default Filme;