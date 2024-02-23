
const main = document.querySelector('#telaPrincipal')
const concluidos = document.querySelector('#concluidos')
const body =  document.querySelector('#corpoPag');
const btn = document.querySelector('#btnMenu')
const novaTarefa = document.querySelector('#novaTarefa')
btn.addEventListener( 'click', menuLateral)
let contenMenu = false

function menuLateral(){

    if (!contenMenu){
        const sec = document.createElement('section')
        let ul = document.createElement('ul')
        ul.setAttribute('type', 'none')
        sec.setAttribute('id', 'config')
        let link = ['Configurações', 'Temas', 'Perfil', 'Sair']
        link.forEach(e => {
            let li = document.createElement('li')
            li.setAttribute('class','itemMenu itemConfig')
            let a = document.createElement('a')
            a.textContent= e
            a.href = '#'
            li.appendChild(a)
            ul.appendChild(li)           
        });
        sec.appendChild(ul)        
        main.appendChild(sec)
        contenMenu = true
        sec.setAttribute('id','menuLateral')
    }else if (contenMenu) {
        const sec2 = document.querySelector('#menuLateral')
        main.removeChild(sec2)
        contenMenu = false
    } 
    
}   
novaTarefa.addEventListener('click', function(){
    const janelaTarefa = document.createElement("div");
    janelaTarefa.setAttribute('id',"janelaTarefa");
    body.appendChild(janelaTarefa);
    const janela = document.createElement("div")
    janela.setAttribute('class','janela')
    janelaTarefa.appendChild(janela)
    const containerJa = document.createElement('div')
    containerJa.setAttribute('class','containerJanela')
    janelaTarefa.appendChild(containerJa)


});
