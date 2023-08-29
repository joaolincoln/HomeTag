var CadastroVetor = []
var CadastroObjeto = {}, DispCadastroObejeto = {}

Array.from(document.querySelectorAll('input[type="radio"]')).forEach(function(item, index) {
    item.addEventListener('click', salvarGenero);
});


function Cadastrar(){

    let Password = false
    let usuario = document.getElementById("email").value.substring(0, document.getElementById("email").value.indexOf("@"));
    let dominio = document.getElementById("email").value.substring(document.getElementById("email").value.indexOf("@")+ 1, document.getElementById("email").value.length)

    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))

    if(CadastroVetor == null){

        CadastroVetor = []
        
        if(document.getElementById("NomeCompleto").value === '' || document.getElementById("email").value === '' || document.getElementById("Senha").value === '' || document.getElementById("ConfSenha").value === ''){

            Swal.fire({
                icon: 'warning',
                title: 'Todos os campos devem ser preenchidos!',
            })

        }else{

            CadastroObjeto.Nome = document.getElementById("NomeCompleto").value
            CadastroObjeto.Email = document.getElementById("email").value
            CadastroObjeto.Senha = document.getElementById("Senha").value
            CadastroObjeto.Telefone = ''
            CadastroObjeto.Genero = ''
            CadastroObjeto.Nascimento = ''
            CadastroObjeto.Dispositivo = []

            if((document.getElementById("Senha").value === document.getElementById("ConfSenha").value) && 
            (document.getElementById("NomeCompleto").value.length >= 4) &&
            (document.getElementById("Senha").value.length >= 8) &&
            (usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) &&
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
      
                Password = true
            }
        }
    
        if(Password == true){
            
            CadastroVetor.push(CadastroObjeto)
            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))
            
            Swal.fire({
                icon: 'success',
                title: 'Cadastro efetuado!',
            }).then(function() {
                window.location.href = "Login.html";
            });
            
        }else{
    
            Swal.fire({
                icon: 'error',
                title: 'Falha no cadastro!',
                html: 'Verifique se:<br>• a senha + confirmação são iguais;<br>• o nome completo tem pelo menos 4 caracteres;<br>• o e-mail é válido.',
            })
        }

            
    }else{

        if(document.getElementById("NomeCompleto").value === '' || document.getElementById("email").value === '' || document.getElementById("Senha").value === '' || document.getElementById("ConfSenha").value === ''){

            Swal.fire({
                icon: 'warning',
                title: 'Todos os campos devem ser preenchidos!',
            })

        }else{

            CadastroObjeto.Nome = document.getElementById("NomeCompleto").value
            CadastroObjeto.Email = document.getElementById("email").value
            CadastroObjeto.Senha = document.getElementById("Senha").value
            CadastroObjeto.Telefone = ''
            CadastroObjeto.Genero = ''
            CadastroObjeto.Nascimento = ''
            CadastroObjeto.Dispositivo = []

            if((document.getElementById("Senha").value === document.getElementById("ConfSenha").value) && 
            (document.getElementById("NomeCompleto").value.length >= 4) &&
            (document.getElementById("Senha").value.length >= 8) &&
            (usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) &&
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {

                Password = true
            }
        }
    
        if(Password == true){

            CadastroVetor.push(CadastroObjeto)
            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

            Swal.fire({
                icon: 'success',
                title: 'Cadastro efetuado!',
            }).then(function() {
                window.location.href = "Login.html";
            });

        }else{
    
            Swal.fire({
                icon: 'error',
                title: 'Falha no cadastro!',
                html: 'Verifique se:<br>• a senha + confirmação são iguais;<br>• o nome completo tem pelo menos 4 caracteres;<br>• o e-mail é válido.',
            })
        }
    }
}


function Login(){

    let Logou = false
    let usuarioLogado

    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))

    if(CadastroVetor == null){

        Swal.fire({
            icon: 'warning',
            title: 'Realize o cadastro primeiro!',
        })

        document.getElementById("email").value = ''
        document.getElementById("Senha").value = ''

    }else{

        for(i=0; i < CadastroVetor.length; i++){
 
            if(document.getElementById("email").value == CadastroVetor[i].Email && document.getElementById("Senha").value == CadastroVetor[i].Senha){
    
                Logou = true
                usuarioLogado = CadastroVetor[i].Nome
            }

        }

        if(Logou == true){

            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

            Swal.fire({
                icon: 'success',
                title: 'Login efetuado!',
            }).then(function() {
                window.location.href = "CRUD Dispositivo.html";
            });

        }else{

            Swal.fire({
                icon: 'error',
                title: 'Falha no login!',
            })
            
            document.getElementById("email").value = ''
            document.getElementById("Senha").value = ''

        }
    }
}


function MostraUserLogado(){

    document.getElementById("nomeUsuario").innerHTML = JSON.parse(localStorage.getItem('usuarioLogado'))

}


function Dispositivo(){

    let PosiçaoDisp, PosiçaoUser, Validaçao = false
    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for(i=0; i < CadastroVetor.length; i++){

        if(usuarioLogado == CadastroVetor[i].Nome){

            if(CadastroVetor[i].Dispositivo.length < 4){

                PosiçaoUser = i

                for(j=0; j <CadastroVetor[i].Dispositivo.length; j++){
          
                    if(document.getElementById("Objetos").value == CadastroVetor[i].Dispositivo[j].Objeto){
                            
                        PosiçaoDisp = j                       
                                           
                    }                     
                } 

                if(CadastroVetor[i].Dispositivo == ''){

                    CadastroVetor[i].Dispositivo = []

                    if(document.getElementById("Objetos").value === '' || document.getElementById("Tag").value === ''){

                        Swal.fire({
                            icon: 'error',
                            title: 'Erro!',
                            html:'Os campos objeto e tag devem ser preenchidos!<br>e/ou<br>já existe um objeto com o mesmo nome!',
                        }).then(function() {
                            window.location.href = "CRUD Dispositivo.html";
                        });
                        
                    }else{

                        if(document.getElementById("Som").checked && document.getElementById("Luz").checked){

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "on"
                            DispCadastroObejeto.Som = "on"
                            DispCadastroObejeto.Sensor = '11'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }else if(document.getElementById("Som").checked){

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "off"
                            DispCadastroObejeto.Som = "on"
                            DispCadastroObejeto.Sensor = '01'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }else if(document.getElementById("Luz").checked){

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "on"
                            DispCadastroObejeto.Som = "off"
                            DispCadastroObejeto.Sensor = '10'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }else{

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "off"
                            DispCadastroObejeto.Som = "off"
                            DispCadastroObejeto.Sensor = '00'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }
                    } 

                }else{

                    if(document.getElementById("Objetos").value === '' || document.getElementById("Tag").value === ''){

                        Swal.fire({
                            icon: 'error',
                            title: 'Erro!',
                            html:'Os campos objeto e tag devem ser preenchidos!<br>e/ou<br>já existe um objeto com o mesmo nome!',
                        }).then(function() {
                            window.location.href = "CRUD Dispositivo.html";
                        });

                    }else{

                        if(document.getElementById("Som").checked && document.getElementById("Luz").checked){

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "on"
                            DispCadastroObejeto.Som = "on"
                            DispCadastroObejeto.Sensor = '11'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica2()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }else if(document.getElementById("Som").checked){

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "off"
                            DispCadastroObejeto.Som = "on"
                            DispCadastroObejeto.Sensor = '01'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica2()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }else if(document.getElementById("Luz").checked){

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "on"
                            DispCadastroObejeto.Som = "off"
                            DispCadastroObejeto.Sensor = '10'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica2()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }else{

                            DispCadastroObejeto.Objeto = document.getElementById("Objetos").value
                            DispCadastroObejeto.Tag = document.getElementById("Tag").value
                            DispCadastroObejeto.Luz = "off"
                            DispCadastroObejeto.Som = "off"
                            DispCadastroObejeto.Sensor = '00'

                            CadastroVetor[i].Dispositivo.push(DispCadastroObejeto)
                            localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                            enviaAnalogica2()

                            Swal.fire({
                                icon: 'success',
                                title: 'Dispositivo cadastrado!',
                            }).then(function() {
                                window.location.href = "CRUD Dispositivo.html";
                            });

                        }
                    } 
                }

            }else{

                Swal.fire({
                    icon: 'warning',
                    title: 'É possível ter apenas 4 objetos cadastrados.',
                }).then(function() {
                    window.location.href = "CRUD Dispositivo.html";
                });
            }   
        }
    }   
}


function ListarDispositivos(){  
  
    let PosiçaoDisp, PosiçaoUser
    // Recria o vetor vazio
    CadastroVetor = []

    // Pega do localStorage os dados e joga para o vetor
    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    // Armazena na variável divList a div pai onde os novos elementos serão criados
    let divList = document.getElementById("Lista")

    // Cria variáveis para armazenar os elementos
    let produtoLista, produtoDiv
       
    // Verifica se a div pai tem filhos
    while (divList.firstChild) {

        // Remove os elementos filhos da div
        divList.removeChild(divList.firstChild);

    }

    // Percorre o vetor de objetos que veio do localStorage

    for(i=0; i < CadastroVetor.length; i++){
    
        if(usuarioLogado == CadastroVetor[i].Nome){
            PosiçaoUser = i
        

            for(j=0; j <CadastroVetor[i].Dispositivo.length; j++){
                // Cria variáveis para armazenas os valor das propriedades dos objetos
                objetoProduto = document.createTextNode(CadastroVetor[i].Dispositivo[j].Objeto)
                tagProduto = document.createTextNode(CadastroVetor[i].Dispositivo[j].Tag)
                luzProduto = document.createTextNode(CadastroVetor[i].Dispositivo[j].Luz)
                somProduto = document.createTextNode(CadastroVetor[i].Dispositivo[j].Som)
                sensorProduto = document.createTextNode(CadastroVetor[i].Dispositivo[j].Sensor)

                // Armazena um elemento do tipo div na variável produtoLista
                produtoLista = document.createElement('div')

                // Cria a div filha produtoLista dentro da div pai divList
                divList.appendChild(produtoLista)

                // Define uma classe para a div filha criada
                produtoLista.classList = ('ObjetosCad')

                // Define um id para a div filha criada
                //produtoLista.id = (`'Objetos'${i}`)

                // Realiza um loop de 5 vezes para cria 5 sub-divs dentro da div filha 
                for (m=0; m < 5; m++){

                    // Armazena um elemento do tipo div na variável produtoDiv
                    produtoDiv = document.createElement('div')

                    // Cria a div filha produtoDiv dentro da div pai produtoLista
                    produtoLista.appendChild(produtoDiv)

                    // Define uma classe para a div filha criada
                    produtoDiv.classList = ('Divs')

                    // Cria condicionais para adicionar os dados dos objetos dentro das divs
                    switch(m){

                    case 0:

                        // Adiciona o valor da propriedade código na sub-div
                        produtoDiv.appendChild(objetoProduto)
                        break

                    case 1:

                        // Adiciona o valor da propriedade nome na sub-div
                        produtoDiv.appendChild(tagProduto)
                        break

                    case 2:

                        // Adiciona o valor da propriedade marca na sub-div
                        produtoDiv.appendChild(luzProduto)
                        break

                    case 3:

                        // Adiciona o valor da propriedade valor na sub-div
                        produtoDiv.appendChild(somProduto)
                        break

                    case 4:

                        // Adiciona o valor da propriedade quantidade na sub-div
                        produtoDiv.appendChild(sensorProduto)
                        break
                    }
                }
            }
        }
    }
}

function Deletar(){

    let PosiçaoDisp, PosiçaoUser, Validaçao = false
    let ItemDeletar = document.getElementById("ObjetosDeletar").value

    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for(i=0; i < CadastroVetor.length; i++){

        if(usuarioLogado == CadastroVetor[i].Nome){

            PosiçaoUser = i

            for(j=0; j <CadastroVetor[i].Dispositivo.length; j++){

                    
                if(ItemDeletar == CadastroVetor[i].Dispositivo[j].Objeto){
                    
                    PosiçaoDisp = j                       
                    Validaçao = true   
                                   
                }                     
            } 
                
            if(Validaçao == true){

                CadastroVetor[PosiçaoUser].Dispositivo.splice(PosiçaoDisp,1)
                localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                Swal.fire({
                    icon: 'success',
                    title: 'Objeto deletado com sucesso!',
                }).then(function() {
                    window.location.href = "CRUD Dispositivo.html";
                });
            
            }else{
            
                Swal.fire({
                    icon: 'warning',
                    title: 'Selecione um objeto existente!',
                }).then(function() {
                    window.location.href = "CRUD Dispositivo.html";
                });
            }                   
        }          
    }
}


function Alterar(){

    let PosiçaoDisp, PosiçaoUser, Validaçao = false
    let ItemAlterar = document.getElementById("ObjetosAlterar").value

    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for(i=0; i < CadastroVetor.length; i++){

        if(usuarioLogado == CadastroVetor[i].Nome){
    
            PosiçaoUser = i

            for(j=0; j <CadastroVetor[i].Dispositivo.length; j++){

                if(ItemAlterar == CadastroVetor[i].Dispositivo[j].Objeto){

                    PosiçaoDisp = j
                    Validaçao = true
                }
            }
        }   
    }

    if(Validaçao == true){

        if(document.getElementById("NovoObjAlterado").value === '' || document.getElementById("TagAlterar").value === ''){

            Swal.fire({
                icon: 'warning',
                title: 'Os campos objeto e tag devem ser preenchidos!',
            }).then(function() {
                window.location.href = "CRUD Dispositivo.html";
            });

        }else{

            if(document.getElementById("SomAlterar").checked && document.getElementById("LuzAlterar").checked){

                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Objeto = document.getElementById("NovoObjAlterado").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Tag = document.getElementById("TagAlterar").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Luz = "on"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Som = "on"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Sensor = '11'

                localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                enviaAnalogica()

                Swal.fire({
                    icon: 'success',
                    title: 'Objeto alterado com sucesso!',
                }).then(function() {
                    window.location.href = "CRUD Dispositivo.html";
                });

            }else if(document.getElementById("SomAlterar").checked){

                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Objeto = document.getElementById("NovoObjAlterado").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Tag = document.getElementById("TagAlterar").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Luz = "off"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Som = "on"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Sensor = '01'

                localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                enviaAnalogica()

                Swal.fire({
                    icon: 'success',
                    title: 'Objeto alterado com sucesso!',
                }).then(function() {
                    window.location.href = "CRUD Dispositivo.html";
                });

            }else if(document.getElementById("LuzAlterar").checked){

                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Objeto = document.getElementById("NovoObjAlterado").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Tag = document.getElementById("TagAlterar").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Luz = "on"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Som = "off"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Sensor = '10'

                localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                enviaAnalogica()

                Swal.fire({
                    icon: 'success',
                    title: 'Objeto alterado com sucesso!',
                }).then(function() {
                    window.location.href = "CRUD Dispositivo.html";
                });

            }else{

                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Objeto = document.getElementById("NovoObjAlterado").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Tag = document.getElementById("TagAlterar").value
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Luz = "off"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Som = "off"
                CadastroVetor[PosiçaoUser].Dispositivo[PosiçaoDisp].Sensor = '00'

                localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

                enviaAnalogica()

                Swal.fire({
                    icon: 'success',
                    title: 'Objeto alterado com sucesso!',
                }).then(function() {
                    window.location.href = "CRUD Dispositivo.html";
                });

            }
        } 

    }else{
   
        Swal.fire({
            icon: 'warning',
            title: 'Selecione um objeto existente!',
        }).then(function() {
            window.location.href = "CRUD Dispositivo.html";
        });
    }
}


function validaUsuario(){

    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if(usuarioLogado == '' || usuarioLogado == null){

        window.location.href = "Login.html"
        
    }

}


function crudCliente(){

    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for(i=0; i < CadastroVetor.length; i++){

        if(usuarioLogado == CadastroVetor[i].Nome){
            
            usuarioLogado = CadastroVetor[i].Nome
            crudCliente2()
        }
    }   
}


function crudCliente2(){

    leNome = document.getElementById("mostraNome")
    leNascimento = document.getElementById("mostraNascimento")
    leEmail = document.getElementById("mostraEmail")
    leTelefone = document.getElementById("mostraTelefone")

    leNome.value = CadastroVetor[i].Nome
    leNascimento.value = CadastroVetor[i].Nascimento
    leEmail.value = CadastroVetor[i].Email
    leTelefone.value = CadastroVetor[i].Telefone
    
    reload()

    function reload() {
                
        var G1 = Array.from(document.getElementsByName('genero'));
        var val1 = (CadastroVetor[i].Genero);
        for (var m = 0; m < G1.length; m++) {
            if (G1[m].value == val1) {
            
                G1[m].checked = true;

            }
        }
    }
}


function editarUsuario(){

    let altUsuario = false
    let emailIncorreto = false
    let usuario = document.getElementById("mostraEmail").value.substring(0, document.getElementById("mostraEmail").value.indexOf("@"));
    let dominio = document.getElementById("mostraEmail").value.substring(document.getElementById("mostraEmail").value.indexOf("@")+ 1, document.getElementById("mostraEmail").value.length)

    CadastroVetor = JSON.parse(localStorage.getItem('cadastroSA'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for(i=0; i < CadastroVetor.length; i++){

        if(usuarioLogado == CadastroVetor[i].Nome){
                               
            if(document.getElementById("mostraNome").value != usuarioLogado){

                if(document.getElementById("mostraNome").value.length >= 4){

                    usuarioLogado = document.getElementById("mostraNome").value
                    CadastroVetor[i].Nome = document.getElementById("mostraNome").value
                    altUsuario = true

                }else{

                    altUsuario = 2

                }
            }

            if(document.getElementById("mostraNascimento").value != CadastroVetor[i].Nascimento){

                CadastroVetor[i].Nascimento = document.getElementById("mostraNascimento").value
                altUsuario = true

            }

            if(document.getElementById("mostraEmail").value != CadastroVetor[i].Email){

                if((usuario.length >=1) &&
                (dominio.length >=3) &&
                (usuario.search("@")==-1) &&
                (dominio.search("@")==-1) &&
                (usuario.search(" ")==-1) &&
                (dominio.search(" ")==-1) &&
                (dominio.search(".")!=-1) &&
                (dominio.indexOf(".") >=1)&&
                (dominio.lastIndexOf(".") < dominio.length - 1)){

                    CadastroVetor[i].Email = document.getElementById("mostraEmail").value
                    altUsuario = true

                }else{

                    emailIncorreto = true

                }
            }
            
            if(document.getElementById("mostraTelefone").value != CadastroVetor[i].Telefone){

                CadastroVetor[i].Telefone = document.getElementById("mostraTelefone").value
                altUsuario = true

            }
                        
            if(document.getElementById("altSenha").value != ''){

                if((document.getElementById("altSenha").value === document.getElementById("confSenha").value) &&
                (document.getElementById("altSenha").value.length >= 4)){

                    CadastroVetor[i].Senha = document.getElementById("altSenha").value
                    CadastroVetor[i].ConfSenha = document.getElementById("confSenha").value

                    altUsuario = true
                    
                }else{

                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        html:'Certifique-se de que os campos "Alterar senha" e "Confirmar senha" possuam um mínimo de 8 caracteres e que estejam iguais para que você possa alterá-la.',
                    })

                    altUsuario = false

                }
            }

            if(altUsuario == true && emailIncorreto == false){

                localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

                Swal.fire({
                    icon: 'success',
                    title: 'Alterações salvas com sucesso.',
                }).then(function() {
                    window.location.href = "CRUD Cliente.html";
                });

            }else if(emailIncorreto == true){

                Swal.fire({
                    icon: 'warning',
                    title: 'Digite um e-mail válido.',
                })

            }else if(altUsuario == 2){

                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    html:'Seu nome de usuário deve conter um mínimo de 4 caracteres.',
                }).then(function() {
                    window.location.href = "CRUD Cliente.html";
                });

            }else{

                Swal.fire({
                    icon: 'warning',
                    title: 'Nenhuma alteração efetuada.',
                })
            }
        }    
    }      
}


function deletarConta(){

    let confDeletar = ''

    CadastroVetor = JSON.parse(localStorage.getItem("cadastroSA"))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    for(l=0; l < CadastroVetor.length; l++){

        if(usuarioLogado == CadastroVetor[l].Nome){
            
            usuarioLogado = CadastroVetor[l].Nome
            confDeletar = prompt(`Você tem certeza de que quer deletar a conta \"${CadastroVetor[l].Nome}\"? (S/N)\nEsta ação é irreversível.`).toUpperCase()

            if(confDeletar == "S"){

                CadastroVetor.splice(l, 1)
                usuarioLogado = ''
               
                localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

                Swal.fire({
                    icon: 'success',
                    title: 'Conta deletada com sucesso.',
                }).then(function() {
                    window.location.href = "Login.html";
                });

            }else if(confDeletar == "N"){

                Swal.fire({
                    icon: 'warning',
                    title: 'Ação cancelada.',
                }).then(function() {
                    window.location.href = "CRUD Cliente.html";
                });
            }
        }
    }   
}


function salvarGenero(){

    var g1 = document.querySelector('input[name=genero]:checked');
    g1 = (g1) ? g1.value : '';

    CadastroVetor[0].Genero = g1

    localStorage.setItem('cadastroSA', JSON.stringify(CadastroVetor))

}


function logOut(){

    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
    
    usuarioLogado = ''
    
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

    Swal.fire({
        icon: 'success',
        title: 'Logout efetuado. Volte sempre!',
    }).then(function() {
        window.location.href = "Home.html";
    });
}


function VoltarInicio(){

    window.location.href = "CRUD Dispositivo.html"

}


function VoltarUsuario(){

    window.location.href = "CRUD Cliente.html"

}


// Armazena a url onde roda a aplicação
url = "http://192.168.48.10"

  // Função que lê o valor do input e envia para a placa (estrutura: ip/rota?variavel=valor)
  // ESTA É A QUE PRECISAMOS UTILIZAR
  
  function enviaAnalogica() {
    

    for(i=0; i < CadastroVetor.length; i++){

        for(j=0; j < CadastroVetor[i].Dispositivo.length; j++){

            var valor = CadastroVetor[i].Dispositivo[j].Sensor
            console.log(valor)
            }
    }

    var xhttp = new XMLHttpRequest();
    console.log("config1");
    xhttp.open("GET", url+"/configuraBotao1?input1="+valor, true);    
    xhttp.send();
  }


  function enviaAnalogica2() {


    for(i=0; i < CadastroVetor.length; i++){

        if(usuarioLogado == CadastroVetor[i].Nome){

            for(j=0; j < CadastroVetor[i].Dispositivo.length; j++){

            var valor = CadastroVetor[i].Dispositivo[j].Sensor
            console.log(valor)
            }
            

        }
    }

    var xhttp = new XMLHttpRequest();
    console.log("config2");
    xhttp.open("GET", url+"/configuraBotao2?input1="+valor, true);    
    xhttp.send();
  }