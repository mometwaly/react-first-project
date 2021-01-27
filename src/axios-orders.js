import axios from 'axios'


const instance = axios.create({
    baseURL : 'https://react-my-burger-a744c-default-rtdb.firebaseio.com/'
})

export default instance