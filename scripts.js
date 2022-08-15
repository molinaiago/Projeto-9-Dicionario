let elementoFormulario = document.querySelector('.js-formulario');
let elementoResultado = document.querySelector('.js-resultado');
let elementoCarregamento = document.querySelector('.js-carregamento');
let elementoResultadoTitulo = document.querySelector('.js-resultado__titulo');
let elementoResultadoDescricao = document.querySelector('.js-resultado__descricao');

elementoFormulario.addEventListener('submit', (evento)=> {
    evento.preventDefault()

elementoCarregamento.classList.remove('display-none')
elementoResultado.classList.remove('display-none')

    let palavra = evento.target[0].value;
    let url = `https://api.dicionario-aberto.net/word/${palavra}`;
    fetch(url)
    .then((resposta) => resposta.json())
    .then((resposta) => {
        if(!resposta[0]) {
            elementoResultadoTitulo.textContent = 'Verifique sua GRAFIA! Palavra não encontrada.'
            elementoResultadoDescricao.textContent = ""
            return;
        }

        let funcaoDeParseamento, elementoParseado;
        funcaoDeParseamento = new DOMParser();
        elementoParseado = funcaoDeParseamento.parseFromString(
            resposta[0].xml,
            "text/xml"
        )

        elementoResultadoTitulo.textContent = elementoParseado
        .getElementsByTagName('form')[0]
        .getElementsByTagName('orth')[0].textContent

        elementoResultadoDescricao.textContent = elementoParseado
        .getElementsByTagName('sense')[0]
        .getElementsByTagName('def')[0].textContent

    })
    .finally(()=>{
        elementoCarregamento.classList.add('display-none')
    })
})