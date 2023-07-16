const BASE_URL = '/api/todo/'

export const todoService = {
    query,
    get,
    remove,
    save,
    getEmptyTodo,
}

function query(filterBy) {
    return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
}

function get(todoId) {
    return axios.get(BASE_URL + todoId).then(res => res.data)
}

function remove(todoId) {
    return axios.delete(BASE_URL + todoId).then(res => res.data)
}

function save(todo) {
    if (todo._id) {
        return axios.put(BASE_URL + todo._id, todo).then(res => res.data)
    } else {
        return axios.post(BASE_URL, todo).then(res => res.data)
    }
}

function getEmptyTodo(title = '', isActive = true) {
    return {
        _id: '',
        title,
        isActive
    }
}