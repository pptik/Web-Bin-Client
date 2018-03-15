const globalURL= "http://localhost:8183";
const globalSetup = {
    app_id:4501
};
const restAPI = {
  signin:globalURL+"/users/signin",
  signup:globalURL+"/users/simple/signup",
  classList:globalURL+"/class/list",
  uploadFile:"http://localhost:3077/files/upload/single",
  createmaerial:globalURL+"/material/create",
};

module.exports={restAPI,globalSetup};
