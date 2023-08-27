const express = require('express');
const router = express.Router();
const controller = require('../controller/cmain');

//home
// router.get('/:id',controller.login)

router.post('/token',controller.post_token);
//router.post('/',controller.post_main);
//회원가입
router.get('/signup',controller.signup)
router.post('/signup',controller.post_signup);

//로그인
router.get('/login',controller.login);
router.post('/login',controller.post_login);

router.get('/profile/:id',controller.profile);
router.post('/profile',controller.post_profile);

router.patch('/profile/edit',controller.edit_profile);
router.delete('/profile/delete',controller.delete_profile);
module.exports=router;