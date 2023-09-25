const socket = io() // eslint-disable-line no-undef
const loggin = document.getElementById('loggin')
const inputLoggin = document.getElementById('input-loggin')
const btnLoggin = document.getElementById('btn-loggin')
const chatBox = document.getElementById('chat-box')
const messages = document.getElementById('messages')

btnLoggin.addEventListener('click', () => {
    if (inputLoggin.value) {
        const inp = document.createElement('input')
        inp.setAttribute('id', 'input-msg')
        inp.setAttribute('placeholder', 'mensaje')
        const btn = document.createElement('button')
        btn.setAttribute('id', 'btn-send-msg')
        btn.textContent = 'Enviar'
        chatBox.appendChild(inp)
        chatBox.appendChild(btn)
        loggin.remove()
        const send = () => {
            if (inp.value.trim().length > 0) {
                socket.emit('message', { user: inputLoggin.value, message: inp.value })
                inp.value = ''
            }
        }
        btn.addEventListener('click', send)
        inp.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                send()
            }
        })
    }
})

socket.on('messageLog', function (items) {
    const fragment = document.createDocumentFragment()
    items.forEach((item) => {
        const li = document.createElement('li')
        li.textContent = `${item.user}: ${item.message}`
        fragment.appendChild(li)
    })
    messages.replaceChildren(fragment)
})
