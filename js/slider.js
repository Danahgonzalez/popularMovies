const carousel = document.querySelector('#carouselGenres'),
arrowBtns = document.querySelectorAll('#wrapCorousel .icon')

let isDragStart = false, prevPageX, prevScrollLeft

const showHideArrows = () =>{
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth
    arrowBtns[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
    arrowBtns[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block'
}

arrowBtns.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const firstBtn = document.querySelectorAll('.btnGenre')[0]
        let firstBtnWidth = firstBtn.clientWidth + 20
        carousel.scrollLeft += arrow.id === 'left' ? -firstBtnWidth : firstBtnWidth
        setTimeout(() => showHideArrows(), 60)
    })
})

const dragStart = (e) => {
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    prevScrollLeft = carousel.scrollLeft
}
const dragging = (e) => {
    if(!isDragStart) return;
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff
    showHideArrows()
}

const dragStop = () => {
    isDragStart = false
}

export const slider = () => {
    carousel.addEventListener('mousedown', dragStart)
    carousel.addEventListener('touchstart', dragStart)

    carousel.addEventListener('mousemove', dragging)
    carousel.addEventListener('touchmove', dragging)

    carousel.addEventListener('mouseup', dragStop)
    carousel.addEventListener('mouseleave', dragStop)
    carousel.addEventListener('touchend', dragStop)
}