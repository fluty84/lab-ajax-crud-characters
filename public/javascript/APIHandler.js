class APIHandler {
  constructor () {
    this.axiosApp = axios.create({
      baseURL : 'https://minions-api.herokuapp.com'
    })
  }

  getFullList () {
    return this.axiosApp.get('/characters')
    
  }

  getOneRegister (id) {
    
    return this.axiosApp.get(`/characters/${id}`)

  }

  createOneRegister (values) {

    console.log(values)

    return this.axiosApp.post('/characters', values)
    
  }

  updateOneRegister (id, data) {
    
    return this.axiosApp.put(`/characters/${id}`, data )


  }

  deleteOneRegister (id) {
    
    return this.axiosApp.delete(`/characters/${id}`)

  }
}
