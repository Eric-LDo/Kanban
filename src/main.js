const main = document.querySelector('#telaPrincipal')
const concluidos = document.querySelector('#concluidos')
const body =  document.querySelector('#corpoPag');
const btn = document.querySelector('#btnMenu')
const novaTarefa = document.querySelector('#novaTarefa')
const A_FAZER = "A fazer"
const  CONCLUIDO = "Concluído"
const EM_REALIZACAO = "Em realização"
const  tarefas = []
const tarefasAF= []
const tarefasC = []
const tarefasER = {}
btn.addEventListener( 'click', menuLateral)
body.addEventListener('keydown'  , function (e){
    if(e.key == 'Escape'){
        menuLateral()
    }
});


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
novaTarefa.addEventListener('click', newTarefa );

function newTarefa(){
    const divJanelaTarefa = document.createElement("div");
    divJanelaTarefa.id = "janelaTarefa";

    const divJanela = document.createElement("div");
    divJanela.className = "janela";

    const divJaHeader = document.createElement("div");
    divJaHeader.className = "jaHeader";
    const divVasia =  document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = "Crie sua nova tarefa aqui";

    const buttonFechar = document.createElement("button");
    buttonFechar.id = "fechar";
    buttonFechar.innerHTML = "<strong>&#10005;</strong>";

    const form = document.createElement("form");
    form.action = "src/Main.js";
    form.className = "containerJanela";

    const labelNomeTarefa = document.createElement("label");
    labelNomeTarefa.htmlFor = "tNome";
    labelNomeTarefa.id = "tNome";
    labelNomeTarefa.innerHTML = "<p>Nome da Tarefa:</p>";
    
    const inputNomeTarefa = document.createElement("input");
    inputNomeTarefa.type = "text";
    inputNomeTarefa.required = true;

    labelNomeTarefa.appendChild(inputNomeTarefa);

    const labelDescricao = document.createElement("label");
    labelDescricao.htmlFor = "descricao";
    labelDescricao.id = "tDescricao";

    const textareaDescricao = document.createElement("textarea");
    textareaDescricao.placeholder = "Adicionar descrição...";
    textareaDescricao.required = true;
    labelDescricao.appendChild(textareaDescricao);

    const labelEtapa = document.createElement("label");
    labelEtapa.htmlFor = "etapa";
    labelEtapa.id = "tEtapa";

    const pAdicionarEtapa = document.createElement("p");
    pAdicionarEtapa.textContent = "Adicionar uma etapa:";

    const inputEtapa = document.createElement("input");
    inputEtapa.type = "text";

    const buttonAdicionarEtapa = document.createElement("input");
    buttonAdicionarEtapa.type = "button";
    buttonAdicionarEtapa.value="Adicionar etapa";
    buttonAdicionarEtapa.id = "tAdicionar";
    

    labelEtapa.appendChild(pAdicionarEtapa);
    labelEtapa.appendChild(inputEtapa);
    labelEtapa.appendChild(buttonAdicionarEtapa);

    const labelEtapas = document.createElement("label");

    const divEtapas = document.createElement("div");
    divEtapas.id = "tetapas";

    const ulEtapas = document.createElement("ul");
    ulEtapas.setAttribute('type', 'none');
    ulEtapas.id = "listaEtapas";

    divEtapas.appendChild(ulEtapas);
    labelEtapas.appendChild(divEtapas);

    const labelSalvarTarefa = document.createElement("label");

    const buttonCriarTarefa = document.createElement("input");
    buttonCriarTarefa.type = "button";
    buttonCriarTarefa.value ="Criar Tarefa";
    buttonCriarTarefa.id = "criarTarefa";
    buttonCriarTarefa.textContent = "Salvar Tarefa";

    labelSalvarTarefa.appendChild(buttonCriarTarefa);
    divJaHeader.appendChild(divVasia);
    divJaHeader.appendChild(h2);
    divJaHeader.appendChild(buttonFechar);
    

    form.appendChild(labelNomeTarefa);
    form.appendChild(labelDescricao);
    form.appendChild(labelEtapa);
    form.appendChild(labelEtapas);
    form.appendChild(labelSalvarTarefa);

    divJanela.appendChild(divJaHeader);
    divJanela.appendChild(form);

    divJanelaTarefa.appendChild(divJanela);

    document.body.prepend(divJanelaTarefa);

    buttonFechar.addEventListener("click", () => { 
        divJanelaTarefa.remove();
    });
    buttonAdicionarEtapa.addEventListener("click", () =>{
        if(!inputEtapa.value.length == 0){
            let li =  document.createElement('li');
            let check= document.createElement('input')
            check.type='checkbox';
            check.className="check-etapa"
            check.addEventListener('focus', (e) => {
                e.target.parentNode.remove()
            }
            )
            li.prepend(check);
            li.append(inputEtapa.value)

            inputEtapa.value= "";

            ulEtapas.appendChild(li)
        } 
    });
    buttonCriarTarefa.addEventListener('click', (e)=>{
            
            let tarefa = new Tarefas(inputNomeTarefa.value,textareaDescricao.value,ulEtapas.childNodes, A_FAZER);
            divJanelaTarefa.remove();
            tarefasAF.push(tarefa)
            atualizarListaDeTarefasAFazer()
    })
} 

function atualizarListaDeTarefasAFazer(){
    
    
    const aFazerBox = document.querySelector('#aFazer .mainSec2')
    aFazerBox.innerHTML=""
    
    for(let i = 0; i < tarefasAF.length ;i++){
        const postit =  document.createElement( 'div');
        postit.setAttribute('class', 'postits afazer')
        const  titulo = document.createElement ('h2');
        titulo.textContent = `${tarefasAF[i].titulo}`;
        const descricao = document.createElement('p');
        descricao.textContent=`${tarefasAF[i].descricao}`
        postit.appendChild(titulo)
        postit.appendChild(descricao)     
        aFazerBox.appendChild(postit)
        mineMenu()
        function mineMenu(){
            var divPrincipal = document.createElement('div');
            divPrincipal.classList.add('btn-group');
            divPrincipal.setAttribute('role', 'group');
            divPrincipal.setAttribute('id', 'drop1')
            
            divPrincipal.setAttribute('aria-label', 'Button group with nested dropdown');

            var divInterna = document.createElement('div');
            divInterna.classList.add('btn-group');
            divInterna.setAttribute('role', 'group');
            
            
            var botaoDropdown = document.createElement('button');
            botaoDropdown.setAttribute('type', 'button');
            botaoDropdown.classList.add('btn', 'btn-primary', 'dropdown-toggle');
            botaoDropdown.setAttribute('data-bs-toggle', 'dropdown');
            botaoDropdown.setAttribute('aria-expanded', 'false');
            var ulDropdown = document.createElement('ul');
            ulDropdown.classList.add('dropdown-menu');
            ulDropdown.setAttribute('id','drop')
        
            var opcoesDropdown = ['Editar', 'Excluir', 'Feito', 'Em andamento'];

            for (var i = 0; i < opcoesDropdown.length; i++) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.classList.add('dropdown-item');
                a.setAttribute('href', '#');
                a.textContent = opcoesDropdown[i];
                li.appendChild(a);
                ulDropdown.appendChild(li);
            }

            // Montagem da estrutura
            botaoDropdown.textContent = ' '; // Adiciona um espaço ao botão para evitar que ele fique muito pequeno
            divInterna.appendChild(botaoDropdown);
            divInterna.appendChild(ulDropdown);
            divPrincipal.appendChild(divInterna);

            // Adiciona a div ao corpo do documento
            postit.prepend(divPrincipal);
            console.log('entrou')  
        }
              
            
        
        


    }
}