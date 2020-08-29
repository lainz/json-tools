# json-tools
Use JSON to make HTML documents

# 1 - Define your styled elements

```javascript
function p(...child) {
    return elm('p', '', '', ...child)
}

function pItalic(...child) {
    return elm('p', 'italic', '', ...child)
}

function spanRedBold(text) {
    return elm('span', 'red bold', text)
}

function span(text) {
    return elm('span', '', text)
}

function div(...child) {
    return elm('div', '', '', ...child)
}

function h1(text) {
    return elm('h1', '', text)
}

function article(title, ...text) {
    return div(
        h1(title),
        ...text
    )
}
```

# 2 - The data

```javascript
var json = div(
    article('Hello World',
        pItalic(
            span('El auto es '), spanRedBold('Rojo.')
        ),
        p(span('Otra línea.'))
    ),
    article('Another World',
        pItalic(
            span('El auto es '), spanRedBold('Super Rojo.')
        ),
        p(span('Otra línea en otro artículo.'))
    )
)
```

# 3 - The program

```javscript
appendTo(document.body, json)
```
