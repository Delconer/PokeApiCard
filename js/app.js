const main = document.getElementById('main')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 152)
    fetchData(random)
})

const fetchData = async(id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        const pokemon = {
            img: data.sprites.other["official-artwork"].front_default,
            name: data.name,
            id: data.id,
            height: data.height/10,
            weight: data.weight/10,
            types: data.types
        }
        pintarCard(pokemon)
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon) => {

    const clone = templateCard.cloneNode(true)
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>#${pokemon.id}</span>`
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = `${pokemon.height}m`
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = `${pokemon.weight}kg`
    clone.querySelector('.card-body-text').textContent = ''
    pokemon.types.forEach(tipo => {
        clone.querySelector('.card-body-text').textContent += `${tipo.type.name} `
    });

    fragment.appendChild(clone)
    main.appendChild(fragment)
}