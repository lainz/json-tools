// COMPONENTS

function article(title, body) {
    // ELEMENTS
    var _title = document.createElement('h1')
    _title.innerText = title

    var _body = document.createElement('p')
    _body.innerText = body

    var _container = document.createElement('div')
    _container.appendChild(_title)
    _container.appendChild(_body)

    // FUNCTIONALITY
    var _count = 0;
    _title.addEventListener('click', function () {
        _count++;
        _title.innerHTML = `Clicked ${_count} times!`
    })

    return _container
}

// DATA

var articles = [
    {
        title: 'Hello World',
        body: 'How are you?'
    },
    {
        title: 'Another World',
        body: 'How are you here?'
    }
]

// PROGRAM

articles.forEach(_article => {
    document.body.appendChild(article(_article.title, _article.body))
})