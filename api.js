function main(pokemon) {
  const query = `{
        pokemon(name: "${pokemon}") {
          id
          number
          name
          image
          attacks {
            special {
              name
              type
              damage
            }
          }
          evolutions {
            id
            number
            name
            weight {
              minimum
              maximum
            }
            attacks {
              fast {
                name
                type
                damage
              }
            }
          }
        }
      }`;

  const url = `https://graphql-pokemon2.vercel.app/?query=${query}`;

  request(url);
}

function request(url) {
  fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Algo deu errado =(');
    })
    .then(response => showPokemons(response.data.pokemon))
    .catch(e => console.error(e));
}

function showPokemons(pokemons) {
  console.log(pokemons);
  const section = document.querySelector('.pokemons');
  const sectionAttacks = document.querySelector('.attacks');
  const attackTitle = document.querySelector('.attackTitle');
  section.innerHTML = '<img src="assets/loader.gif" width="20%"> <p>Loading...</p>';

  const htmlImage = `
          <img src="${pokemons.image}" width="60%">
          <p>${pokemons.name}</p>
    `;
 
    const table = `
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Dano</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${pokemons.attacks.special[0].name}</td>
            <td>${pokemons.attacks.special[0].type}</td>
            <td>${pokemons.attacks.special[0].damage}</td>
          </tr>
          <tr>
            <td>${pokemons.attacks.special[1].name}</td>
            <td>${pokemons.attacks.special[1].type}</td>
            <td>${pokemons.attacks.special[1].damage}</td>
          </tr>
          <tr>
            <td>${pokemons.attacks.special[2].name}</td>
            <td>${pokemons.attacks.special[2].type}</td>
            <td>${pokemons.attacks.special[2].damage}</td>
          </tr>
        </tbody>
      </table>    
    `;
  
  
  section.innerHTML = htmlImage;
  attackTitle.innerHTML = '<p>Ataques</p>';
  sectionAttacks.classList.add('active');
  sectionAttacks.innerHTML = table;
}

const button = document.querySelector('.inputs button');

button.addEventListener('click', () => {
  const pokemon = document.querySelector('.inputs input');
  main(pokemon.value);
  pokemon.value = '';
});


