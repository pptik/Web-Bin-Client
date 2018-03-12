const globalURL= "http://localhost:8183";
const globalSetup = {
    app_id:4501
};
const restAPI = {
    signin:globalURL+"/users/signin",
    signup:globalURL+"/users/simple/signup"
};

module.exports={restAPI,globalSetup};
