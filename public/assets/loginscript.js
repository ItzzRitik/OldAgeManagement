/* global $ */

$('.form-control').focusout(function() {
    $('.form-group').removeClass('focus');
});
$('.form-control').focus(function() {
    $(this).closest('.form-group').addClass('focus');
});

$('.form-control').keyup(function() {
    if ($(this).val().length > 0) {
        $(this).closest('.form-group').addClass('filled');
    }
    else {
        $(this).closest('.form-group').removeClass('filled');
    }
});

var $formControl = $('.form-control');
var values = {};
var validate = $formControl.each(function() {
    if ($(this).val().length > 0) {
        $(this).closest('.form-group').addClass('filled');
    }
    else {
        $(this).closest('.form-group').removeClass('filled');
    }
});

$('.close').click(function() {
    $(this).closest('.register-form').toggleClass('open');
});

$('.btn').click(function() {
    var id = $('.id').val(),
        pass = $('.pass').val();
    if (id != "" && pass != "") {
        const http = new XMLHttpRequest()
        http.open('POST', '/login')
        http.setRequestHeader('Content-type', 'application/json')
        http.onreadystatechange = function() {
            if (http.readyState == XMLHttpRequest.DONE) {
                if (http.responseText == 1) {
                    swal("Congratulations!", ", You are succesfully logged in!", "success");
                    var url = 'http://google.com';
                    var form = $('<form action="' + url + '" method="post">' +
                        '<input type="text" name="email" value="' + id + '" />' +
                        '</form>');
                    $('body').append(form);
                    form.submit();
                }
                else if (http.responseText == 0) {
                    swal("Alert!", ", Incorrect password!", "error");
                }
                else if (http.responseText == 2) {
                    swal("Please Check Email!", ",This Account Doesn't Exists!", "error");
                }
            }
        }
        http.send(JSON.stringify({
            email: id,
            pass: pass
        }))
    }
});

var name, email, pass, conpass, age, gender, address, disease, signup = 0;
$('.circlebtn').click(function() {
    if (signup == 0) {
        name = $('.a').val();
        email = $('.b').val();
        pass = $('.c').val();
        conpass = $('.d').val();
        if (name != "" && email != "" && pass != "" && pass == conpass) {
            signup = 1;

            $('.a').val("");
            $('.b').val("");
            $('.c').val("");
            $('.d').val("");

            $('.aa').text("Age");
            $('.bb').text("Gender");
            $('.cc').text("Address");
            $('.dd').text("History of Disease");

            $(".c, .d").prop("type", "text");

            $('.register-form h2').text("PROFILE");
            $('.close').css('display', 'none');
            $('.register-form h2').css('color', '#ED2553');
            $('.register-form').css({
                "color": "#ED2553",
                "background": "#FFF"
            });
            $('.register-form .form-group .form-label, .register-form .form-group .form-control').css('color', '#ED2553');
        }
    }
    else if (signup == 1) {
        age = $('.a').val();
        gender = $('.b').val();
        address = $('.c').val();
        disease = $('.d').val();

        const http = new XMLHttpRequest()
        http.open('POST', '/signup')
        http.setRequestHeader('Content-type', 'application/json')
        http.onreadystatechange = function() {
            if (http.readyState == XMLHttpRequest.DONE) {
                if (http.responseText == 1) {
                    $('.close').css({
                        "display": "inline",
                        "color": "#fff",
                        "font-size": "25px",
                        "transform": "rotate(0deg)",
                        "line-height": "55px",
                        "right": "15px"
                    });
                    $('.register-form').css('background', '#4BB543');
                    $(".close").click();
                    $('.close').text("✓");
                    $(".close").off('click');
                }
            }
        }
        http.send(JSON.stringify({
            email: email,
            pass: conpass,
            name: name,
            age: age,
            gender: gender,
            address: address,
            disease: disease
        }))
    }
});
