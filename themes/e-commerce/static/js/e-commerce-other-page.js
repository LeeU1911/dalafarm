// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});
$(document).ready(function () {
    equalHeightAsTheTallest();
});

function equalHeightAsTheTallest() {
    var heights = $(".product-box").map(function () {
            return $(this).height();
        }).get(),

        maxHeight = Math.max.apply(null, heights);
    $(".product-box").height(maxHeight);
}

