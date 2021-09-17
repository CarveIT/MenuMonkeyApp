import Keys from "../Utilities/Keys";
import Constants from "../Utilities/Constants";
const base_url = 'http://babynboy.com/menumonkey/api/';

class ApiCalls {
    async getApiCall(endPoint) {
        let url = `${base_url}` + endPoint;
        console.log(url)
        try {
            let request = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ Constants.user.token
                    // 'Authorization': 'Bearer '+Keys.AUTH
                }
            });
            let result = await request
            return result.json();
        } catch (error) {
            console.log(error)
            throw error.message;
        }
    }

    async postApiCall(params, endPoint) {
        var url = `${base_url}` + endPoint;
        console.log(url);
        console.log(params);
        try {
            let request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data', // , multipart/form-data
                    'Authorization': 'Bearer '+ Constants.user.token
                },
                body: params // JSON.stringify(params)
            });

            let result = await request
            return result.json();
        }
        catch (error) {
            console.log(error)
            throw error.message;
        }
    }
}

const api = new ApiCalls();
export default api;