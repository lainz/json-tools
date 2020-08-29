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
    if (obj.events)
        obj.events.forEach(event => elm.addEventListener(event.name, event.call))
    parent.appendChild(elm)
    if (obj.child)
        obj.child.forEach(element => parseObj(element, elm))
}

function appendTo(parent, ...json) {
    var json = [...json]
    json.forEach(element => parseObj(element, parent))
}

function elm(type, _class, text, events, ...child) {
    return {
        type: type,
        class: _class,
        text: text,
        events: events,
        child: [...child]
    }
}

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
    article('Another World... Click me',
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