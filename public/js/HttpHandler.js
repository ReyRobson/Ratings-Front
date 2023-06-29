const axios = require('axios')


async function makeGet(value){
    try {
        let res = await axios.get("http://localhost:3000/search", {params : {item: `${value}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

module.exports = {makeGet}