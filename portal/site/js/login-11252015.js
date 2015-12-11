/* 11/25/2015 */
var COPA = COPA || {},
	userCheck = /[a-zA-Z]+(@copaair)?|(masoftwaresystems.com)?\.com$/,
    api = 'http://www.copaseguridad.com/authenticate/',
    day = 86400000;

jQuery.support.cors = true;

COPA.Authenticate = {
    set: function (key, val, exp) {
        store.set(key, {
            val: val,
            exp: exp,
            time:new Date().getTime()
        });
    },
    get: function (key) {
        var info = store.get(key)
        if (!info) {
            return null;
        }
        if (new Date().getTime() - info.time > info.exp) {
            return null;
        }
        return info.val;
    },
    register: function (auth) {
	    jQuery.support.cors = true;
        var userMessage = '';
        jQuery.ajax({
            url: api + 'register',
            method: 'POST',
            data: auth,
            success: function (data) {
                if (data && data.authenticate && data.register) {
                    jQuery('.auth').hide();
                    jQuery('.registered').show();
                } else {
                    userMessage = data.error + '<br><a href="login.html"> LOGIN</a> or <a href="reset.html"> RESET PASSWORD</a>'
                    jQuery('.validate.user').html(userMessage).show();
                }
            },
            error: function (jqXHR, status, error) {
                console.log(error);
            }
        });
    },
    reset: function (auth) {
        jQuery.support.cors = true;
        jQuery.ajax({
            url: api + 'reset',
            method: 'POST',
            data: auth,
            dataType: 'json',
            success: function (data) {
                if (data && data.authenticate) {
                    if (store.enabled) {
                        COPA.Authenticate.set(
                            'username',
                            data.username,
                            day
                        );
                    }
                    jQuery('.reseter').remove();
                    jQuery('.registered').show();
                    jQuery('.auth').hide();
                    jQuery('.menuItem .auth').html('<a href="login.html">Login</a>');
                }
            },
            error: function (jqXHR, status, error) {
                console.log(jqXHR.responseText);
                console.log(status);
                console.log(error);
            }
        });
    },
    login: function (auth) {
        var message = '* Email address or password was incorrect';
        jQuery.support.cors = true;
        jQuery.ajax({
            url: api + 'login',
            method: 'POST',
            data: auth,
            success: function (data) {
                jQuery('.spin').hide();
                if (data && data.authenticate && data.login) {
                    store.remove('username');
                    if (store.enabled) {
                        COPA.Authenticate.set(
                            'username',
                            data.username,
                            day
                        );
                    }
                    jQuery('.success').show();
                    location.href = 'index.html';
                } else {
                    jQuery('.spin').hide();
                    jQuery('.auth').show();
                    jQuery('.validate.user').html(message).show();
                }
            },
            error: function (jqXHR, status, error) {
                jQuery('.spin').hide();
                jQuery('.auth').show();
                jQuery('.validate.user').html(message).show();
                console.log(error);
            }
        });
    },
	validate: function (type) {
        var user = jQuery('#user').val(),
            isValid = userCheck.test(user),
            message = '';

        switch (type) {
            case 'login':
                if (!isValid) {
                    message = '* Copa Air email address required';
                }
                break;
            case 'register':
                if (!isValid) {
                    message = '<p>The email address you entered does not appear to be a valid copaair.com email address. ' +
                    'Re-enter your email address.</p>' +
                    '<p>Questions? Send an email to <a href="mailto:seguridad@copaair.com">seguridad@copaair.com</a></p>';
                }
            case 'reset':
                isValid = true;
                break;
        }

		jQuery('.validate.user').html('').hide();

		if (!isValid) {
			jQuery('.validate.user').html(message).show();
            jQuery('.auth').show();
            jQuery('.spin').hide();
            return false;
		}
        return true;
	},
    init: function () {
        jQuery('.menuItem .auth').html('<a href="login.html">Login</a>');
        if (COPA.Authenticate.get('username') !== null && typeof COPA.Authenticate.get('username') !== 'undefined') {
            var user = COPA.Authenticate.get('username').split('@')[0];
            jQuery('.menuItem .auth').html('<a href="profile.html">Welcome, ' + user + '</a>');
            jQuery('.username').html(COPA.Authenticate.get('username'));
            jQuery('.home').show();
        } else {
            if (location.pathname.indexOf('login.html') === -1 &&
                location.pathname.indexOf('register.html') === -1 &&
                location.pathname.indexOf('reset.html') === -1) {
                location.href = 'login.html';
            } else {
                jQuery('.home').show();
            }
        }
        jQuery('#login').click(function () {
            jQuery('.spin').show();
            jQuery('.auth').hide();
            if (COPA.Authenticate.validate('login')) {
                COPA.Authenticate.login({
                    username: jQuery('#user').val(),
                    password: jQuery('#token').val()
                });
            }
        });

        jQuery('#register').click(function () {
            var N = 10,
                token = Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);

            if (COPA.Authenticate.validate('register')) {
                COPA.Authenticate.register({
                    username: jQuery('#user').val(),
                    password: token
                });
            }
        });

        jQuery('#reset').click(function () {
            var N = 10,
                token = Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
            console.log('token: ' + token);
            if (COPA.Authenticate.validate('reset')) {
                COPA.Authenticate.reset({
                    username:  jQuery('#user').val() || COPA.Authenticate.get('username'),
                    password: token
                });
            }
        });

        jQuery('#logout').click(function () {
            store.remove('username');
            location.href = 'login.html';
        });
    }
};

jQuery(document).ready(function () {
    COPA.Authenticate.init();
});
