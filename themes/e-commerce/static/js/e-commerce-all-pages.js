// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    if($(this).hasClass('dropdown-toggle')){
        return;
    }
    $('.navbar-toggle:visible').click();
});


