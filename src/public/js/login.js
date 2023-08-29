const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const body = {
        email: data.get('email'),
        password: data.get('password')
    }
    try {
        const resp = await fetch('http://localhost:8080/api/session/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const respJson = await resp.json()
        if (!resp.ok) throw new Error(respJson.error)
        window.location.replace('http://localhost:8080/products')
    } catch (error) {
        alert(error)
    }
})
