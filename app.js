// ==============================================
// BASIC LIBRARY
// ==============================================

function parseObj(obj, parent) {
    let elm;
    if (obj.type)
        elm = document.createElement(obj.type);
    else
        elm = document.createElement('span');
    if (obj.class)
        elm.classList = obj.class
    if (obj.text)
        elm.innerText = obj.text
    parent.appendChild(elm)
    if (obj.child)
        obj.child.forEach(element => parseObj(element, elm))
}

function appendTo(parent, ...json) {
    var json = [...json]
    json.forEach(element => parseObj(element, parent))
}

function elm(type, _class, text, ...child) {
    return {
        type: type,
        class: _class,
        text: text,
        child: [...child]
    }
}

// ==============================================
// CUSTOM ELEMENTS
// ==============================================

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

// ==============================================
// COMPLEX ELEMENTS
// ==============================================

function article(title, ...text) {
    return div(
        h1(title),
        ...text
    )
}

// ==============================================
// DATA
// ==============================================

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

// ==============================================
// PROGRAM
// ==============================================

console.log(json)
appendTo(document.body, json)