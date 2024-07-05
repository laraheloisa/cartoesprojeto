const inputUsuario = document.getElementById('username');
const buttonAdicionar = document.getElementById('button');
const cartoes = document.getElementById('cartoes');

buttonAdicionar.addEventListener('click', async () => {
    const usuario = inputUsuario.value.trim();
    if(usuario){
        const procurar = await buscarUsuario(usuario);
        if (procurar) {
            adicionarCartao(procurar);
            inputUsuario.value = '';
        } else {
            alert('Usuário não encontrado');
        }
    }
})

async function buscarUsuario(usuario){
    try{
        //biblioteca, Faz uma requisição GET à API do GitHub para obter dados do usuário
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário no GitHub:', error);
        return null;
    }
}

function adicionarCartao(usuario){
    const cartao = document.createElement('div')
    cartao.classList.add('rounded', 'shadow-lg', 'bg-white', 'border', 'border-gray-200', 'flex', 'flex-col', 'items-center', 'm-10');

    cartao.innerHTML = `
    <img src="${usuario.avatar_url}" alt="imagem fundo" class="w-full rounded-lg h-40 mb-4">
    <img src="${usuario.avatar_url}" alt="imagem usuário" class="w-24 h-24 rounded-full mb-4 absolute my-20 border-4 border-white">
    <div class="font-sans flex flex-col items-center">
      <p id="nome" class="text-xl">${usuario.name || 'Nome não disponível'}</p>
      <p id="login" class="text-lg text-gray-500">@${usuario.login}</p>    
    </div>
    <div class="w-full px-4">
      <ul id="repositorio">
        <li class="font-bold text-sm my-10 my-4">REPOSITÓRIOS</li>
        <div id="lista-repos-${usuario.login}"></div>
      </ul>
    </div>
    `;

    cartoes.appendChild(cartao);


}


