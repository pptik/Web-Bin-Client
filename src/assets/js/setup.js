const globalURL= "http://localhost:8183";
const globalSetup = {
    app_id:4501
};
const restAPI = {
  signin:globalURL+"/users/signin",
  signup:globalURL+"/users/simple/signup",
  classList:globalURL+"/class/list",
  uploadFile:"http://167.205.7.233:3077/files/upload/single",
  createmaerial:globalURL+"/material/create",
  updatematerial:globalURL+"/material/update",
  deletematerial:globalURL+"/material/delete",
  detailmaterial:globalURL+"/material/detail",
  materiallist:globalURL+"/material/list",
  createnews:globalURL+"/news/create",
  createquiz:globalURL+"/quizzes/create",
  updatequiz:globalURL+"/quizzes/update",
  publishquiz:globalURL+"/quizzes/publish",
  detailquiz:globalURL+"/quizzes/detail",
  deletequestion:globalURL+"/quizzes/delete/question",
  unpublishquiz:globalURL+"/quizzes/unpublish",
  quizcreatequestion:globalURL+"/quizzes/create/question",
  quizupdatequestion:globalURL+"/quizzes/update/question",
  allquizlist:globalURL+"/quizzes/all/list",
};

module.exports={restAPI,globalSetup};
