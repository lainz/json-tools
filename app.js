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
    if (obj.id)
        elm.id = obj.id
    parent.appendChild(elm)
    if (obj.child)
        obj.child.forEach(element => parseObj(element, elm))
}

function appendTo(parent, ...json) {
    var json = [...json]
    json.forEach(element => parseObj(element, parent))
}

function elm(id, type, _class, text, events, ...child) {
    return {
        id: id,
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
    return elm('', 'p', '', '', null, ...child)
}

function pItalic(...child) {
    return elm('', 'p', 'italic', '', null, ...child)
}

function spanRedBold(text) {
    return elm('', 'span', 'red bold', text)
}

function span(text) {
    return elm('', 'span', '', text)
}

function div(...child) {
    return elm('', 'div', '', '', null, ...child)
}

function form(event, ...child) {
    return elm('', 'form', '', '', [{ name: 'submit', call: event }], ...child)
}

function br() {
    return elm('', 'br', '')
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

function h1(text) {
    // CLOSURE
    var count = 0

    // ELEMENT FUNCTIONALITY
    function alertTitle(event) {
        count++;
        event.target.innerText = `You clicked me ${count} times!`
    }

    return elm('', 'h1', 'hand', text, [{ name: 'click', call: alertTitle }])
}

function getChildOfForm(event, id) {
    return event.target.parentElement.querySelector(id)
}

function myInput(name) {
    var _name = name

    function myAlert(event) {
        // GET TARGET ELEMENT
        var out = getChildOfForm(event, '#out_' + _name)
        // SET TEXT
        out.innerText = `${_name}: ${event.target.value}`
    }

    return div(
        elm('in_' + _name, 'input', '', '', [{ name: 'keyup', call: myAlert }]),
        br(),
        elm('out_' + _name, 'span', '', `${_name}:`)
    )
}

function myForm() {

    function mySubmit(event) {
        // GET INPUT ELEMENT
        var input1 = getChildOfForm(event, '#in_Nombre')
        var input2 = getChildOfForm(event, '#in_Correo')
        // ALERT
        alert(`Submit ${input1.value} ${input2.value}!`)
        event.preventDefault()
    }

    return form(
        mySubmit,
        myInput('Nombre'),
        br(),
        myInput('Correo'),
        elm('', 'button', '', 'Submit')
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
    ),
    myForm(),
)

// ==============================================
// PROGRAM
// ==============================================

console.log(json)
appendTo(document.body, json)