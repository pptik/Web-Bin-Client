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
  updatematerial:globalURL+"/material/update",
  deletematerial:globalURL+"/material/delete",
  detailmaterial:globalURL+"/material/detail",
  materiallist:globalURL+"/material/list",
  createnews:globalURL+"/news/create",
};

module.exports={restAPI,globalSetup};
