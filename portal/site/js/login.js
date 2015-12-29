/* 11/30/2015 */
var COPA = COPA || {},
    api = 'http://www.copaseguridad.com/authenticate/',
    day = 86400000;

jQuery.support.cors = true;

function emailDomainCheck(email, domain) {
    var parts = email.split('@');
    if (parts.length === 2) {
        if (parts[1] === domain) {
            return true;
        }
    }
    return false;
}

COPA.Authenticate = {
    set: function (cname, cvalue, exdays) {
        var d = new Date(),
            expires;
        
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; domain=.copaseguridad.com;path=/';
    },
    get: function (cname) {
        var name = cname + '=',
            ca = document.cookie.split(';'),
            i,
            c;
        
        for(i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    remove: function () {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    },
    register: function (auth) {
	    jQuery.support.cors = true;
        var userMessage = '';
        jQuery.ajax({
            url: api + 'register',
            method: 'POST',
            data: JSON.stringify(auth),
            dataType: 'json',
            processData: false,
            success: function (data) {
                console.log(data);
                if (data && data.authenticate && data.register) {
                    jQuery('.auth').hide();
                    jQuery('.registered').show();
                } else {
                    userMessage = data.error + '<br><a href="login.html"> LOGIN</a> or <a href="reset.html"> RESET PASSWORD</a>'
                    jQuery('.validate.user').html(userMessage).show();
                }
            },
            error: function (jqXHR, status, error) {
                console.log(jqXHR.responseText);
                console.log(status);
                console.log(error);
            }
        });
    },
    reset: function (auth) {
        jQuery.support.cors = true;
        jQuery.ajax({
            url: api + 'reset',
            method: 'POST',
            data: JSON.stringify(auth),
            dataType: 'json',
            processData: false,
            success: function (data) {
                console.log(data);
                if (data && data.authenticate) {
                    COPA.Authenticate.set(
                        'user',
                        data.username,
                        day
                    );
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
            data: JSON.stringify(auth),
            dataType: 'json',
            processData: false,
            success: function (data) {
                jQuery('.spin').hide();
                console.log(data);
                if (data && data.authenticate && data.login) {
                    COPA.Authenticate.set(
                        'user',
                        data.username,
                        day
                    );
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
                console.log(jqXHR.responseText);
                console.log(status);
                console.log(error);
            }
        });
    },
	validate: function (type, user) {     
         
        var language = COPA.Authenticate.get('language') || 'en',
            domains = {
                copa: 'copaair.com',
                mass: 'masoftwaresystems.com',
                gmail: 'gmail.com'
            },
            isValid = (emailDomainCheck(user, domains.copa) || emailDomainCheck(user, domains.mass)),
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
                    
                    if (language === 'es') {
                        message = '<p>La dirección de correo electrónico que ha introducido no parece ser un correo electrónico valido copaair.com.' +
                            'Por favor vuelva a introducir su dirección de correo electrónico.</p>' +
                            '<p>¿Preguntas? Envíe un correo electrónico a <a href="mailto:seguridad@copaair.com">seguridad@copaair.com</a></p>';
                    }
                }
                break;
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
        var language = COPA.Authenticate.get('language');
        if (language === '') {
            COPA.Authenticate.set(
                'language',
                'en',
                day
            );
            language = 'en';
        }
        if (COPA.Authenticate.get('user') !== null && COPA.Authenticate.get('user') !== '') {
            var user = COPA.Authenticate.get('user').split('@')[0],
                welcome = (language === 'es') ? 'Bienvenidos' : 'Welcome';
            jQuery('.menuItem .auth').html('<a href="profile.html">' + welcome +', ' + user + '</a>');
            jQuery('.username').html(COPA.Authenticate.get('user'));
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
            var user = jQuery('#user').val();

            jQuery('.spin').show();
            jQuery('.auth').hide();
            if (COPA.Authenticate.validate('login', user)) {
                COPA.Authenticate.login({
                    username: user,
                    password: jQuery('#token').val()
                });
            }
        });

        jQuery('#register').click(function () {
            var N = 10,
                token = Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N),
                user = jQuery('#user').val();

            if (COPA.Authenticate.validate('register', user)) {
                COPA.Authenticate.register({
                    username: user,
                    password: token
                });
            }
        });

        jQuery('#reset').click(function () {
            var N = 10,
                token = Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N),
                user = jQuery('#user').val() || COPA.Authenticate.get('user');

            if (COPA.Authenticate.validate('reset', user)) {
                COPA.Authenticate.reset({
                    username: user,
                    password: token
                });
            }
        });

        jQuery('#logout').click(function () {
            COPA.Authenticate.remove();
            location.href = 'login.html';
        });

        jQuery('#lang-en').click(function () {
            var href = location.pathname;

            COPA.Authenticate.set(
                'language',
                'en',
                day
            );
            href = href.replace('/es/', '/en/');
            location.href = href;
        });

        jQuery('#lang-es').click(function () {
            var href = location.pathname;

            COPA.Authenticate.set(
                'language',
                'es',
                day
            );
            href = href.replace('/en/', '/es/');
            location.href = href;
        });
    }
};

jQuery(document).ready(function () {
    COPA.Authenticate.init();
});
