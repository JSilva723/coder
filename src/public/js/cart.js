// eslint-disable-next-line no-unused-vars
const addToCart = async (pid) => {
    try {
        const respCart = await fetch('http://localhost:8080/api/carts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        const { cid } = await respCart.json()
        await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        localStorage.setItem('cartId', JSON.stringify(cid))
        showCart()
    } catch (error) {
        alert(error)
    }
}

const currentCart = document.getElementById('currentCart')

// eslint-disable-next-line no-unused-vars
function closeCart () {
    const cartList = document.getElementById('cartList')
    cartList.remove()
}

// eslint-disable-next-line no-unused-vars
const showCart = async () => {
    const cartList = document.getElementById('cartList')
    if (cartList) closeCart()
    try {
        const cid = localStorage.getItem('cartId').replaceAll('"', '')
        const respCart = await fetch(`http://localhost:8080/api/carts/${cid}`)
        const cart = await respCart.json()
        const div = document.createElement('div')
        div.setAttribute('id', 'cartList')
        const h3 = document.createElement('h3')
        h3.innerText = 'Carro'
        div.appendChild(h3)
        const btnClose = document.createElement('button')
        btnClose.innerText = 'cerrar'
        btnClose.setAttribute('onclick', 'closeCart()')
        div.appendChild(btnClose)
        const ul = document.createElement('ul')
        cart.products.forEach(item => {
            const li = document.createElement('li')
            li.innerText = `${item.product.title} - cantidad: ${item.quantity}`
            ul.appendChild(li)
        })
        div.appendChild(ul)
        currentCart.appendChild(div)
    } catch (error) {
        alert(error)
    }
}
// eslint-disable-next-line no-unused-vars
const logout = async () => {
    try {
        const resp = await fetch('http://localhost:8080/api/session/logout')
        const respJson = await resp.json()
        if (!resp.ok) throw new Error(respJson.error)
        window.location.replace('http://localhost:8080/')
    } catch (error) {
        console.log(error) // eslint-disable-line no-console
    }
}
