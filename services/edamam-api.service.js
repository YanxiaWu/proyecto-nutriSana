const axios = require("axios");

class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: "https://api.edamam.com/api",
        })

        this.jsonHeader = { headers: { 'Content-Type': 'application/json' } }
    }

    getRecipe = (body) => {
        return this.axiosApp.post('/nutrition-details?app_id=d3f9147b&app_key=b526a4ec27f87aa09981ca28c4b5fa30', body, this.jsonHeader)
    }






    // async function doPostRequest() {

    //     let payload = { name: 'John Doe', occupation: 'gardener' };

    //     let res = await axios.post('http://httpbin.org/post', payload);

    //     let data = res.data;
    //     console.log(data);
    // }

    // doPostRequest();



}

module.exports = ApiService;
