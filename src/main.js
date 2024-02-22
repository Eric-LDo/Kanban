const main = document.querySelector('#telaPrincipal')
const concluidos = document.querySelector('#concluidos')
let contenMenu = false

function menuLateral(){
    const sect = document.createElement('section')
    sect.setAttribute( 'id', 'menuLateral' )

    
    const nav = document.createElement('nav');
    nav.id = 'configMenu';
    const links = ['Configurações', 'Temas', 'Perfil', 'Sair'];
    
    
    if(contenMenu==false){
        
        links.forEach(linkText => {
            const li = document.createElement('li');
            const a = document.createElement('a')
            a.href = '#';
            a.textContent = linkText;
            li.appendChild(a);
            nav.appendChild(li); 
            
            section.appendChild(nav);
            
            main.appendChild(sect)
        });
        contenMenu = true
    } else{
        main.remove(sect);
        contenMenu = false

    }
    
    
}