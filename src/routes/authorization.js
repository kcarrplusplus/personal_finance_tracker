const Router = require('express').Router;
const passportTwitter = require('../auth/twitter');
const passportGithub = require('../auth/github');
const passportGoogle = require('../auth/google');

const router = Router();

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Please Sign In with:' });
});

router.get('/logout', function(req, res) {
    req.logout;
    res.redirect('/');
});

// Twitter Login Flow
router.get('/twitter', passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
    passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // successful authentication, redirect hoem.
        res.redirect('/');
    });

// Github Login Flow
router.get('/github', passportGithub.authenticate('github', { scope: ['user:email']}));

router.get('/github/callback',
    passportGithub.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // successful authentication, redirect hoem.
        res.redirect('/');
    });

// Google Login Flow
router.get('/google', passportGoogle.authenticate('google', { scope: ['email', 'profile'] } ));

router.get('/google/callback',
    passportGoogle.authenticate('google', { 
        failureRedirect: '/login' }),
    function (req, res) {
        // successful authentication, redirect hoem.
        res.redirect('/');
    });
    
module.exports = router;