//const model = require('../model/Model');
const {User} = require('../models');
const jwt = require('jsonwebtoken');
const userInfo = {userid:'123', pw:'123', name:'123'};
const secret = 'mysecretkey';
const bcrypt = require("bcrypt");



//token
const post_token = (req,res)=>{
    
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ');
        const verify_token = jwt.verify(token[1],secret);
        console.log("result",verify_token);
        User.findOne({
            where : {userid:verify_token}
        }).then((result)=>{
            console.log('token result',result.userid);
            if(result.userid===verify_token){
                console.log('토큰 인증 성공');
                res.send({result : true ,data:result.dataValues});
            }
        })
       
    }else{
        res.send({result : false});
    }
    
}
//회원가입
const signup=(req,res)=>{
    res.render('signup');
}

const post_signup=(req,res)=>{
    console.log("sigunup_req.body",req.body);
    const encode_pw = createHash(req.body.pw);
    console.log("bcrypt",createHash(req.body.pw));
    User.create({ 
        userid: req.body.userid, 
        name: req.body.name, 
        pw: encode_pw
    }).then(() => {
        res.send({result:true});
    });

}
//로그인

const login = (req,res)=>{
    res.render('login');
}

const post_login = (req,res)=>{
    console.log("login_req.body",req.body);
    const {userid, pw} = req.body;
    User.findOne({
        where:{userid}
    }).then((result)=>{
        const isVerify = compareHash(pw,result.pw);
        console.log("isVerify",isVerify);
        console.log("post_login",pw);
        console.log("result",result.pw);
     
        if(isVerify){
            const token = jwt.sign(req.body.userid,secret);
            res.send({result: true , token, data: result.dataValues});
        }else{
            res.send({result: false});
        }
        
    })
    // if(req.body.userid === userInfo.userid && req.body.pw === userInfo.pw){
    //     const token = jwt.sign(req.body.userid,secret);
    //     res.send({result: true , token});
    // }else{
    //     res.send({result: false});
    // }
    
}
// const post_main = (req,res)=>{
//     console.log("req.params",req.params.id);
// }
const profile = (req,res)=>{
    console.log("req.params",req.params.id);
    
    // console.log('');
    User.findOne({
        where: {id: req.params.id},
    }).then((result)=>{
        console.log("findOne",result.dataValues);
        res.render('profile',{data:result.dataValues});
    })
}

// const post_profile = (req,res)=>{
//     console.log(req.body);
//     User.findOne({
//         where : {}
//     })
//     res.send({reulst:true , memberinfo:userInfo.name});
//     // console.log('');
//     // User.findOne({
//     //     where: {id: req.params.number},
//     // })
// }

const edit_profile = (req,res)=>{
    const {userid,name,pw} = req.body;
    console.log("edit",pw);
    const encode_pw= createHash(pw);
    User.update({name,pw:encode_pw},{where: {userid}}).then(()=>{
        res.send({result:true});
    });
}

const delete_profile = (req,res)=>{
    const{userid} = req.body;

    User.destroy({where: {userid}}).then((result)=>{
        console.log(result);
        res.send({result:true});
    });
}
module.exports={
    post_token,
    signup,
    post_signup,
    login,
    post_login,
    profile,
    post_profile,
    edit_profile,
    delete_profile
}

const createHash = (password) =>{
    return bcrypt.hashSync(password,10);
}
const compareHash = (password, dbPassword)=>{
    return bcrypt.compareSync(password,dbPassword);
}