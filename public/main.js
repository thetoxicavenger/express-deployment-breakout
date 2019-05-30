(function () {
    document.addEventListener('DOMContentLoaded', async () => {
        const res = await axios('/api/todos')
        const todosJson = res.data

        todosJson.forEach(todo => {
            const container = document.createElement('div')
            const completedCheckMark = document.createElement('input')
            completedCheckMark.type = 'checkbox'
            completedCheckMark.checked = todo.completed

            completedCheckMark.addEventListener('change', () => {
                if (title.style.textDecoration === 'line-through') {
                    title.style.textDecoration = 'none'
                    return putTodo({ ...todo, completed: false })
                }
                title.style.textDecoration = 'line-through'
                return putTodo({ ...todo, completed: true })
            })

            container.appendChild(completedCheckMark)
            const title = document.createElement('label')
            title.textContent = todo.title
            title.style.textDecoration = todo.completed ? 'line-through' : 'none'
            container.appendChild(title)
            document.body.appendChild(container)
        })

    })
})()

async function putTodo(updated) {
    const res = await axios('/api/todos/' + updated.id, {
        method: 'PUT',
        data: updated
    })
    console.log(res.data)
}