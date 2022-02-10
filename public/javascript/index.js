const charactersAPI = new APIHandler();



window.addEventListener('load', () => { //mostrar todos
  document.getElementById('fetch-all').addEventListener('click', () => {

    document.querySelector('.characters-container').innerHTML = ``

    let charactersArray = []

    charactersAPI
      .getFullList()
      .then((characters) => {
        characters.data.forEach(element => {
          charactersArray.push(element)

        })
      })

      .then(() => {
        charactersArray.forEach(minion => (
          document.querySelector('.characters-container').innerHTML += `
      <div class="character-info">
        <div class="name">Name${minion.name}</div>
        <div class="occupation">Occupation:${minion.occupation}</div>
        <div class="cartoon">Is a Cartoon?${minion.cartoon}</div>
        <div class="weapon">Character Weapon: ${minion.weapon}</div>
      </div>`
        ))

      })
      .catch(console.log('La has liado sacando los personajes', charactersArray))


  }

  );

  // saca uno

  document.getElementById('fetch-one').addEventListener('click', () => {

    document.querySelector('.characters-container').innerHTML = `<div class="character-info">
      <div class="name">Name</div>
      <div class="occupation">Occupation:</div>
      <div class="cartoon">Is a Cartoon?</div>
      <div class="weapon">Character Weapon:</div>
    </div>`

    let id = document.querySelectorAll('.operation input')[0].value

    let name = document.querySelector('.name')
    let occupation = document.querySelector('.occupation')
    let cartoon = document.querySelector('.cartoon')
    let weapon = document.querySelector('.weapon')

    let insert = {}

    charactersAPI
      .getOneRegister(id)
      .then((character) => {
        insert.character = character

        name.innerHTML = `Name: ${insert.character.data.name}`
        occupation.innerHTML = `Occupation: ${insert.character.data.occupation}`
        cartoon.innerHTML = `Cartoon: ${insert.character.data.cartoon}`
        weapon.innerHTML = `Weapon: ${insert.character.data.weapon}`

        document.querySelectorAll('#edit-character-form input')[0].value = insert.character.data.id
        document.querySelectorAll('#edit-character-form input')[1].value = insert.character.data.name
        document.querySelectorAll('#edit-character-form input')[2].value = insert.character.data.occupation
        document.querySelectorAll('#edit-character-form input')[3].value = insert.character.data.weapon
        document.querySelectorAll('#edit-character-form input')[4].checked = insert.character.data.cartoon



      })
      .catch(console.log('La has liado en fetch one', insert))



  });

  // borrar uno

  document.getElementById('delete-one').addEventListener('click', () => {

    const id = document.querySelector('.operation.delete input').value
    // console.log(id)
    charactersAPI
      .deleteOneRegister(id)
      .then(()=>document.querySelector('#delete-one').classList.toggle('correct'))

      .catch(()=>document.querySelector('#delete-one').classList.toggle('wrong'))



  });

  //editar uno

  document.getElementById('edit-character-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const id = document.querySelectorAll('#edit-character-form input')[0].value
    const name = document.querySelectorAll('#edit-character-form input')[1].value
    const occupation = document.querySelectorAll('#edit-character-form input')[2].value
    const weapon = document.querySelectorAll('#edit-character-form input')[3].value
    const cartoon = document.querySelectorAll('#edit-character-form input')[4].checked
    const data = { name, occupation, weapon, cartoon }

    charactersAPI
      .updateOneRegister(id, data)
      .then(()=>document.querySelector('#update-data').classList.toggle('correct'))
      .catch(()=>document.querySelector('#update-data').classList.toggle('wrong'))

  });


  // crear uno

  document.getElementById('new-character-form').addEventListener('submit', (e) => {
    e.preventDefault() //para que el formulario recargue la pagina

    const name = document.querySelectorAll('#new-character-form input')[0].value
    const occupation = document.querySelectorAll('#new-character-form input')[1].value
    const weapon = document.querySelectorAll('#new-character-form input')[2].value
    const cartoon = document.querySelectorAll('#new-character-form input')[3].checked

    console.log(name, occupation, weapon, cartoon)

    const data = { name, occupation, weapon, cartoon }

    console.log(data)

    charactersAPI
      .createOneRegister(data)
      .then(()=> document.querySelector('#create-data').classList.toggle('correct'))
      .catch(()=> document.querySelector('#create-data').classList.toggle('wrong'))






  });
});
