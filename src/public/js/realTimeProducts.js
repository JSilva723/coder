const socket = io() // eslint-disable-line no-undef
const products = document.getElementById('products')

socket.on('products', function (items) {
    const fragment = document.createDocumentFragment()
    items.forEach((item) => {
        const li = document.createElement('li')
        li.textContent = item.title
        fragment.appendChild(li)
    })
    products.replaceChildren(fragment)
})
