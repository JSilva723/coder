const signUpForm = document.getElementById('signUpForm')

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const body = {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('first_name'),
        lastName: data.get('last_name'),
        age: data.get('age')
    }
    try {
        const resp = await fetch('http://localhost:8080/api/session/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const respJson = await resp.json()
        if (!resp.ok) throw new Error(respJson.error)
        window.location.replace('http://localhost:8080/')
    } catch (error) {
        alert(error)
    }
})
