const globalURL= "http://167.205.7.226:8186";
const globalSetup = {
    app_id:4501
};
const restAPI = {
  signin:globalURL+"/users/signin",
  signup:globalURL+"/users/simple/signup",

  classList:globalURL+"/class/list",
  uploadFile:"http://167.205.7.226:8186/images/create",
  uploadFilevideo:"http://167.205.7.233:3088/filesvideo/upload/single",
  uploadFilesuara:"http://167.205.7.233:3088/filesaudio/upload/single",
  createImage: globalURL+"/images/create",
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
