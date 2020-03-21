var data = {}

const get_data = async _ => {
    let response = await fetch('dados.json');
    let res = await response.json();
    data = res
}

const init = async _ => {
    await get_data();
    resumeOnTela(await resume())

}

var resume = async _ => {
    let exit = {}
    let dados = data.pedidos
    dados.forEach(element => {
        element.pedido.forEach(element => {
            if(!(element.produto in exit)){
                exit[element.produto] = {
                    "quantidade": element.quantidade,
                    "unidade": element.unidade
                }
            } else{
                if(exit[element.produto].unidade === element.unidade){
                    exit[element.produto].quantidade += element.quantidade
                }
            }
        });
    });
    console.log(exit);
    return exit
}

var resumeOnTela = async resume => {
    let resumeTitle = document.getElementById("resume-title")
    resumeTitle.innerHTML = `<h3>Romanaeio: ${data.title} ${data.date}</h3>`
    let ul = document.getElementById("lista-produtos")
    let aux = resume
    Object.entries(resume).forEach(element => {
        let li = document.createElement('li')
        let liText = document.createTextNode(`${element[0]} ${element[1].quantidade} ${element[1].unidade}`)

        li.appendChild(liText)
        ul.appendChild(li)
    });
}

init()
