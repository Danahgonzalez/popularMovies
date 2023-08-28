const genreContent = document.querySelector('#carouselGenres')

const loadGenres = async () => {
   try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=e08243ccaeeaf6ad6b7861b01f5ae135')
        return await response.json()
   } catch (error) {
        console.log(error)
   }
}

const insertGenres = (data) => {
    let genres = ``

    data.forEach(genre => {
        genres += `<button class="btnGenre" draggable="false" data-name="${genre.id}">${genre.name}</button>`
        
    })

    genreContent.insertAdjacentHTML('beforeend',genres) 
}

export const doIt = () => {
    window.addEventListener('DOMContentLoaded', async () =>{
        const data = await loadGenres()
        insertGenres(data.genres)
    })
}