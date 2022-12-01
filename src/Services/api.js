// url = https://api.themoviedb.org/3/movie/now_playing?api_key=e7765c0a8aae3b427ea689efba5a0668&language=pt
// base = https://api.themoviedb.org/3/

import axios from 'axios'


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;

