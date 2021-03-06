var ES = require('../settings/email');
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({
    host        : ES.host,
    user        : ES.user,
    password    : ES.password,
    ssl         : true

});

EM.dispatchWelcomeEmail = function(account, callback)
{
    if (ES.sendWelcomeEmail)
    {
        EM.server.send({
            from : ES.sender,
            to : account.email,
            subject : 'Welcome to nodejs-account-boilerplate',
            text : 'something went wrong... :(',
            attachment : EM.composeWelcomeEmail(account)
        }, callback );
    }
    else
    {
        callback();
    }
}

EM.dispatchResetPasswordLink = function(account, callback)
{
    EM.server.send({
        from : ES.sender,
        to : account.email,
        subject : 'Password Reset',
        text : 'something went wrong... :(',
        attachment : EM.composeResetPasswordEmail(account)
    }, callback );
}

EM.composeWelcomeEmail = function(o)
{
    var html = "<html><body>";
    html += "Hi,<br><br>";
    html += "Welcome to nodejs-account-boilerplate!<br><br>";
    html += "Cheers,<br>";
    html += "Your nodejs-account-boilerplate team<br><br>";
    html += "</body></html>";
    return [{data:html, alternative:true}];
}

EM.composeResetPasswordEmail = function(o)
{
    // todo set your deployment url
    var link = 'http://<yoururl.com>/reset-password?email='+o.email+'&token='+o.password_reset_token;
    var html = "<html><body>";
    html += "Hi,<br><br>";
    html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>";
    html += "Cheers,<br>";
    html += "Your nodejs-account-boilerplate team<br><br>";
    html += "</body></html>";
    return [{data:html, alternative:true}];
}