const router = require('koa-router')();
const {requestResponse}=require('../setup');
const usersModel=require('../models/users_models');
const regionsModel=require('../models/regions_models');
const { checkBody } = require('../utilities/body_checker');
const { validateEmail, validatePhone } = require('../utilities/body_checker');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { parseBoolean } = require('../utilities/parse_boolean');
const { generateReferenceCode } = require('../utilities/reference_code');
const { checkToken } = require('../utilities/token_helper');
const randomstring = require("randomstring");

router.post('/users/signin', async (ctx, next) => {
    let query = Object.assign(ctx.request.body, ctx.request.header);
    if (checkBody(['username', 'password','app_id', 'force', 'current_device', 'current_number', 'carrier'], query)) {
        try {
            let isEmail=validateEmail(query.username);
            let isPhone = validatePhone(query.username);
            let profile={};
            let result;
            if(isEmail)profile=await usersModel.findUserProfileByEmail(query.username);
            else if (isPhone)profile=await usersModel.findUserProfileByPhone(query.username);
            else profile=await usersModel.findUserProfileByUsername(query.username);

            if(!profile){
            result=Object.assign(requestResponse.account_not_found);
            }else {
                if(await bcrypt.compare(query.password,profile.password)){
                    if(!profile.verified)result=Object.assign(requestResponse.account_not_verified_by_admin);
                    else {
                        let alreadyLogin = profile.access.some(a => a.app_id === parseInt(query.app_id));
                        let access = {};
                        let access = {};
                        for (let i = 0; i < profile.access.length; i++) {
                            if (profile.access[i].app_id=== parseInt(query.app_id))
                                access = profile.access[i]
                        }
                        if (access['current_device'] === query['current_device']) query['force'] = true;

                        if (alreadyLogin && !parseBoolean(query.force) ) {
                           result = Object.assign(requestResponse.account_already_login);
                           result.rm = 'Anda telah masuk sebelumnya menggunakan perangkat ' + access.current_device + ', Lanjutkan?'
                        } else  {
                            profile = await usersModel.regenerateToken(access.token, profile.username, query);
                            result=Object.assign(requestResponse.common_success);
                            result.results = profile;
                        }
                    }
                }else result=requestResponse.account_not_found;
            }
            ctx.body=result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});

router.post('/users/signup', async (ctx, next) => {
    if (checkBody(['identificationNumber','name', 'username', 'password', 'phoneNumber','address',
            'email', 'villageID', 'signupType'], ctx.request.body)) {
        try {
            let query=ctx.request.body;
            let checkDuplication=false;
            let result={};
            if(await usersModel.checkPhoneNumber(query.phoneNumber)){
                checkDuplication=true;
                result=Object.assign(requestResponse.phone_number_already_use);
            }
            if(await usersModel.checkEmail(query.email)){
                checkDuplication=true;
                result=Object.assign(requestResponse.email_already_use);
            }
            if(await usersModel.checkIdentificationNumber(query.identificationNumber)){
                checkDuplication=true;
                result=Object.assign(requestResponse.identification_number_already_use);
            }
            query.village=await regionsModel.getVillageDetail(query.villageID);
            query.district=await regionsModel.getDistrictDetail(query.village.district_code);
            query.regency=await regionsModel.getRegencyDetail(query.district.regency_code);
            query.province=await regionsModel.getProvinceDetail(query.regency.province_code);

            if(!checkDuplication){
                await usersModel.signup(query);
                result=Object.assign(requestResponse.common_success);
                result.rm="Berhasil Melakukan Pendaftaran,Selamat Bergabung :), Silahkan Melakukan Login Untuk Menggunakan Aplikasi";
            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});
router.post('/users/list/all', async (ctx, next) => {
    let query = Object.assign(ctx.request.body, ctx.request.header);
    if (checkBody(['access_token'],query)) {
        try {
            let result;
            let user = await checkToken(query.access_token);
            if (user === false) result=Object.assign(requestResponse.token_invalid);
            else {
                let users=await usersModel.getListAllUser();
                result=Object.assign(requestResponse.common_success);
                result.results=users;
            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});
router.post('/users/list/verified', async (ctx, next) => {
    let query = Object.assign(ctx.request.body, ctx.request.header);
    if (checkBody(['access_token'],query)) {
        try {
            let result;
            let user = await checkToken(query.access_token);
            if (user === false) result=Object.assign(requestResponse.token_invalid);
            else {
                let users=await usersModel.getListVerifiedUser();
                result=Object.assign(requestResponse.common_success);
                result.results=users;
            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});
router.post('/users/list/not/verified', async (ctx, next) => {
    let query = Object.assign(ctx.request.body, ctx.request.header);
    if (checkBody(['access_token'],query)) {
        try {
            let result;
            let user = await checkToken(query.access_token);
            if (user === false) result=Object.assign(requestResponse.token_invalid);
            else {
                let users=await usersModel.getListNotVerifiedUser();
                result=Object.assign(requestResponse.common_success);
                result.results=users;
            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});
router.post('/users/verify', async (ctx, next) => {
    let query = Object.assign(ctx.request.body, ctx.request.header);
    if (checkBody(['access_token','UserID'],query)) {
        try {
            let result;
            let user = await checkToken(query.access_token);
            if (user === false) result=Object.assign(requestResponse.token_invalid);
            else {
                await usersModel.verifyUser(query.UserID);
                result=Object.assign(requestResponse.common_success);
            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});

router.post('/users/simple/signup', async (ctx) => {
    if (checkBody(['Email','Username','PhoneNumber','Password','ReferenceCode','SignupType'], ctx.request.body)) {
        try {
            let query=ctx.request.body;
            let checkDuplication=false;
            let result=null;

            if(await usersModel.checkEmail(query.Email)){
                checkDuplication=true;
                result=Object.assign(requestResponse.email_already_use);
            }
            if(await usersModel.checkPhoneNumber(query.phoneNumber)){
                checkDuplication=true;
                result=Object.assign(requestResponse.phone_number_already_use);
            }
            if(await usersModel.checkUsername(query.Username)){
                checkDuplication=true;
                result=Object.assign(requestResponse.username_already_use);
            }
            query.ReferencedBy=await usersModel.checkUserReferenceCode(query.ReferenceCode);
            if(!query.ReferencedBy){
               checkDuplication=true;
                result=Object.assign(requestResponse.reference_code_not_found);
            }

            if(!checkDuplication){
                let detailUser= await usersModel.signupSimple(query);
                await usersModel.updateReferenceUser(query.ReferenceCode,detailUser._id,detailUser.username);
                result=Object.assign(requestResponse.signup_success);


            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});
router.post('/users/register/leader', async (ctx) => {
    if (checkBody(['Email','Username','PhoneNumber','Password','SignupType'], ctx.request.body)) {
        try {
            let query=ctx.request.body;
            let checkDuplication=false;
            let result=null;

            if(await usersModel.checkEmail(query.Email)){
                checkDuplication=true;
                result=Object.assign(requestResponse.email_already_use);
            }
            if(await usersModel.checkPhoneNumber(query.PhoneNumber)){
                checkDuplication=true;
                result=Object.assign(requestResponse.phone_number_already_use);
            }
            if(await usersModel.checkUsername(query.Username)){
                checkDuplication=true;
                result=Object.assign(requestResponse.username_already_use);
            }
            if(!checkDuplication){
                query.ReferenceCode=await generateReferenceCode();
                await usersModel.registerLeader(query);
              result=Object.assign(requestResponse.register_leader_success);
            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});
router.post('/users/leaderboards', async (ctx, next) => {
    let query = Object.assign(ctx.request.body, ctx.request.header);
    if (checkBody(['access_token'],query)) {
        try {
            let result;
            let user = await checkToken(query.access_token);
            if (user === false) result=Object.assign(requestResponse.token_invalid);
            else {
                result=Object.assign(requestResponse.common_success);
                result.results=await usersModel.getListLeaderBoardName();
            }
            ctx.body = result;
        } catch (error) {
            console.log("Error : ", error);
            ctx.body = Object.assign(requestResponse.common_error)
        }
    } else ctx.body = Object.assign(requestResponse.body_incomplte)
});
module.exports = router;
