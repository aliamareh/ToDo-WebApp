
function Service() {
    const apiURI = "http://localhost:8080/api/v1"
    const retrieveData = () => {
        return fetch(apiURI + "/posts", {
            method: "GET",
            headers : {
                "X-API-Version" : "1"
            }
        })
            .then(res => res.json());

    }

    const commitData = (data) =>{
        return fetch(apiURI + "/posts", {
            method: "POST",
            body: JSON.stringify(data),
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-API-Version" : "1"
            }
        }).then(res => res.json())
    }
    const updateData = (id, data) =>{
        return fetch(apiURI + "/posts/"+id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-API-Version" : "1"
            }
        }).then(res => res.json())
    }

    const deleteData = (id) =>{
        return fetch(apiURI + "/posts/"+id, {
            method: "DELETE",
            headers : {
                "Content-Type": "application/json",
                "X-API-Version" : "1"
            }
        })
    }

    return {
        retrieveData,commitData,updateData, deleteData
    }
}

export default Service();