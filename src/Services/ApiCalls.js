import Keys from "../Utilities/Keys";
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
                    'Authorization': 'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWY1NGRmMmI4YzFlMzYxMjJjYWZjZjAzZDE4YmMyMDRmZjA1ODU5OTg5NWM2YWQ2YjBjMTViM2U0MDc5MzcyODE0NGQxNjQxOGVkMDhmNDMiLCJpYXQiOjE2MzExMTg5NTMsIm5iZiI6MTYzMTExODk1MywiZXhwIjoxNjYyNjU0OTUzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.nH7w9mO3RMvi-bSvkHxNJwzFo0BIGRbWVvzgFmlwK-2hAMdMLUc-Qums9Y2aSW1wUmduhqYhDjZsbHVf2cQAgrx5e8xF5Q0qUWSWLfynslfrRJnU1FXm0OLQ0YzWeLd68sOPt-eLGcKd3H71D_-pssf6eiXeKlYXuvXyhb0e5X3ZIl61HG1-JTk78qZrnL6T2LGRBVxgWtzBzMLkQ2chcBrDh8sYpxArzoHINUbOQA-fa4gfM90b5po3--NXWle-LI2LEprJqa5T6VPwb9JHyBTJU_glUGyw6UFM9p3EFa-a3BeKYMecXtSAe_5noxWBfoXca_W93kebq2KERsEfeKQQg1zDe37nuJqoAjiSOhbcUGIQFK9dWxJphHLBmkdgV7xPVTmfVeMzwq-gEn4fDgLfmy64F7lQ0HvigOpTFQ-iog8AhbuvjQ7zs8K5EslG2XDcfuspKUSxD2MSyTipOgV9jjX7kVtM757P83FrjzXdq_wj4xyBFj0l1E9XsFP0YLV-NuA9rWuPcwioeKwa9tJGZZUq5AXECi36SbH0Jbefvqr0reskma7KVPGSrVnq5FXr4DSMliAAU9qtszC4IMIm8itJ3VHBEZRDSItB85w8qDJmiLRhW4gIjlTr3F0Y2FToACdhJiRVre51N5tFT-TM-oAeDSLptDIHaCMGCRU'
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
                    'Authorization': Keys.AUTH
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