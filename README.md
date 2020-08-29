# json-tools
Use JSON to make HTML documents

Preview: https://jsbin.com/qofemol/4/edit?js,output

# 1 - Define your styled and functional blocks

```javascript
// ==============================================
// CUSTOM ELEMENTS
// ==============================================

function p(...child) {
    return elm('p', '', '', null, ...child)
}

function pItalic(...child) {
    return elm('p', 'italic', '', null, ...child)
}

function spanRedBold(text) {
    return elm('span', 'red bold', text)
}

function span(text) {
    return elm('span', '', text)
}

function div(...child) {
    return elm('div', '', '', null, ...child)
}

function h1(text) {
    // CLOSURE
    var count = 0

    // ELEMENT FUNCTIONALITY
    function alertTitle (event) {
        count++;
        event.target.innerText = `You clicked me ${count} times!`
    }
    
    return elm('h1', 'hand', text, [{name:'click', call: alertTitle}])
}

// ==============================================
// COMPLEX ELEMENTS
// ==============================================

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
