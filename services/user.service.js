import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    saveUserToStorage,
    addActivity
}

// Demo Data:
// signup({ fullname: 'Noa Kirel', username: 'babi', password: '123' })
login({ username: 'babi', password: '123' })

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null)
}

function login(credentials) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(u => u.username === credentials.username)
            if (user) {
                return saveUserToStorage(user)
            } else {
                return Promise.reject('Invalid credentials')
            }
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve()
}

function signup(credentials) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(u => u.username === credentials.username)
            if (user) return Promise.reject('Username already taken')
            return storageService.post(USER_KEY, 
                {...credentials, 
                    balance: 10000, 
                    activities: [],
                    prefs: {
                        color: '',
                        bgColor: ''
                    }
                })
                .then(user => {
                    return saveUserToStorage(user)
                })
        })
}

function addActivity(activity) {
    const user = getLoggedinUser()

    user.activities.unshift(activity)

    return storageService.put(USER_KEY, user)
        .then(updatedUser => {
            saveUserToStorage(updatedUser)
            return updatedUser
        })
}

function saveUserToStorage(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}