const movieContent = document.querySelector('#moviesContent')
const fatherBtn = document.querySelector('#carouselGenres')
const btnSiguiente = document.querySelector('#btnSiguiente')
const btnPrevious = document.querySelector('#btnPrevious')

let page = 1
let peliculas = []

const anterior =  () => {
    if(page > 1){
        page--
        globalFilter()
    }
}
 
const siguiente = async () => {
    if(page <= 1000){
        page++
        globalFilter()
    }
}

const loadMovie = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e08243ccaeeaf6ad6b7861b01f5ae135&page=${page}`)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const insertMovies = (data) => {
    let movies = ``

    data.forEach(pelicula => {
        movies += `
            <div class="movie" data-name='${pelicula.genre_ids}'>
                <div class="moviePoster">
                    <img src="https://image.tmdb.org/t/p//w500/${pelicula.poster_path}" alt="${pelicula.title}">
                </div>
                <div class="movieInfo">
                    <h3 class="movieInfo__title">${pelicula.title}</h3>
                    <span class="movieInfo__date">${pelicula.release_date}</span>
                </div>
            </div>
        `
    });

    movieContent.innerHTML = movies
}

const filterMovies = (element) => {

    const peliculasFiltradas = peliculas.filter(pelicula => pelicula.genre_ids.some(genre => genre == element.target.dataset.name) || element.target.dataset.name === 'all')
    
    if(peliculasFiltradas.length === 0){
        movieContent.innerHTML = `<h1>Movies didn't found</h1>`
    }else{
        insertMovies(peliculasFiltradas)
    }
 
}

const globalFilter = async () => {
    const data = await loadMovie()
    peliculas = data.results
    const allGenresBtns = document.querySelectorAll('.btnGenre')

        allGenresBtns.forEach( btn => {

            if(btn.classList.contains('active')){
                const pelisFiltradas = peliculas.filter(pelicula => pelicula.genre_ids.some(genre => genre == btn.dataset.name || btn.dataset.name === 'all'))
                insertMovies(pelisFiltradas)
            }

        })
}



export const run = () => {
    window.addEventListener('DOMContentLoaded', async () => {
        const data = await loadMovie()
        peliculas = data.results
        insertMovies(peliculas)
    })

    fatherBtn.addEventListener('click', (e) => {
        if(e.target.classList.contains('btnGenre')){
            
            document.querySelector('.active').classList.remove('active')
            e.target.classList.add('active')

            filterMovies(e)
        }
    })
    
    btnSiguiente.addEventListener('click', siguiente)
    btnPrevious.addEventListener('click', anterior)
}
