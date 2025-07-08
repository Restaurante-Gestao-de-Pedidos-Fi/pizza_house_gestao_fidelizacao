const url = "http://localhost:3000"

const item = {
  add : async (form) => {

    console.log("Criando Item no Cardapio");

    const formData = new FormData(form);
    const header   = { method:"POST", body:formData }
    let response   = await fetch(`${url}/api/cardapio`, header);

    if (!response.ok) {
      console.error("Erro na requisição");
      return false
    }

    let data = await response.json();
    
    console.log("Resposta da API:", data.message);
    return true;

   /*  fetch(`${url}/api/cardapio`, header)
      .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          return response.json();
      })
      .then((data) => {
          console.log("Resposta da API:", data);
          return 
      })
      .catch((error) => {
          console.error("Error:", error);
      }) */


  },
  update : async (id, form) => {

    console.log("Atualizando Item no Cardapio");

    const formData = new FormData(form);
    const header   = { method:"PUT", body:formData }
    let response   = await fetch(`${url}/api/cardapio/${id}`, header);

    if (!response.ok) {
      console.error("Erro na requisição");
      return false
    }

    let data = await response.json();
    
    console.log("Resposta da API:", data.message);
    return true;

  },
  delete : async (id) => {

    console.log("Removendo Item do Cardapio");

    const header   = { method:"DELETE" }
    let response   = await fetch(`${url}/api/cardapio/${id}`, header);

    if (!response.ok) {
      console.error("Erro na requisição");
      return false
    }

    let data = await response.json();
    
    console.log("Resposta da API:", data.message);
    return true;

  },
  getById : async (id) => {

    console.log("Buscando Item no Cardapio");

    let response = await fetch(`${url}/api/cardapio/${id}`);

    if (!response.ok) {
      console.error("Erro na requisição");
      return null
    }

    let data = await response.json();
    
    console.log("Resposta da API:", data);
    return data;

  },
  getAll : async () => {

    console.log("Buscando todos os Itens do Cardapio");

    let response = await fetch(`${url}/api/cardapio`);

    if (!response.ok) {
      console.error("Erro na requisição");
      return []
    }

    let data = await response.json();
    
    console.log("Resposta da API:", data);
    return data;

  },
  getByCategory : async (category) => {

    console.log("Buscando Itens por Categoria no Cardapio");

    let response = await fetch(`${url}/api/cardapio/categoria/${category}`);

    if (!response.ok) {
      console.error("Erro na requisição");
      return []
    }

    let data = await response.json();
    
    console.log("Resposta da API:", data);
    return data;

  },
  getByName : async (name) => {

    console.log("Buscando Itens por Nome no Cardapio");

    let response = await fetch(`${url}/api/cardapio/nome/${name}`);

    if (!response.ok) {
      console.error("Erro na requisição");
      return []
    }

    let data = await response.json();
    
    console.log("Resposta da API:", data);
    return data;

  },
}


export default item 