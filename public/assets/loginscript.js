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
        console.log(name + "\n" + email + "\n" + pass + "\n" + age + "\n" + gender + "\n" + gender + "\n" + disease);
    }
});
