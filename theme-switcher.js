const htmlBlock = document.documentElement

const saveUserTheme = localStorage.getItem('user-theme')

let resetButton

let userTheme
if (window.matchMedia) {
    userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme'
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    !saveUserTheme ? changeTheme() : null
})

function setThemeClass() {
    if (saveUserTheme) {
        htmlBlock.classList.add(saveUserTheme)
        if (resetButton != null) {
            resetButton.forEach(button => {
                button.classList.add('active')
            })
        }
    } else {
        htmlBlock.classList.add(userTheme)
    }
}

setThemeClass()

function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains('light-theme') ? 'light-theme' : 'dark-theme'
    let newTheme

    if (currentTheme === 'light-theme') {
        newTheme = 'dark-theme'
    } else if (currentTheme === 'dark-theme') {
        newTheme = 'light-theme'
    }
    htmlBlock.classList.remove(currentTheme)
    htmlBlock.classList.add(newTheme)
    saveTheme ? localStorage.setItem('user-theme', newTheme) : null
}

window.addEventListener('load', () => {

    const themeButton = document.querySelectorAll('.switch-theme__button')
    resetButton = document.querySelectorAll('.switch-theme__reset')
    if (themeButton) {
        themeButton.forEach(button => {
            button.addEventListener('click', function(event) {
                if (resetButton) {
                    resetButton.forEach(button => {
                        button.classList.add('active')
                    })
                }
                changeTheme(true)
            })
        })
    }
    if (resetButton) {
        resetButton.forEach(button => {
            button.addEventListener('click', function(event) {
                resetButton.classList.remove('active')
                localStorage.setItem('user-theme', '')
            })
        })
    }
})