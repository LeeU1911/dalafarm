// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    if($(this).hasClass('dropdown-toggle')){
        return;
    }
    $('.navbar-toggle:visible').click();
});

$(document).ready(function(){
   // loadStyleSheet("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
   loadStyleSheet("https://cdnjs.cloudflare.com/ajax/libs/jquery-form-validator/2.3.44/theme-default.min.css");
   loadStyleSheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
   loadStyleSheet("//fonts.googleapis.com/css?family=Muli:400,700");
   loadStyleSheet("//fonts.googleapis.com/css?family=Kaushan+Script");
   loadStyleSheet("//fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700");

});
function loadStyleSheet(src) {
    if (document.createStyleSheet){
        document.createStyleSheet(src);
    }
    else {
        $("head").append($("<link rel='stylesheet' href='"+src+"' type='text/css' media='screen' />"));
    }
};


