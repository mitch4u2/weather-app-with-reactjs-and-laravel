$(function() {
  $(".go-up").click(function() {
    $(this).toggleClass("toggle-up");
    $(".top").slideToggle("slow");
    $(".forecast").css("max-height", "100%");
  });
  $(".lnr-chevron-left").click(function() {
    $(this).toggleClass("toggle-right");
    $(".top").toggleClass("nav-wrapper-active");
    $(".bottom").toggleClass("nav-wrapper-active");
  });
  $(".lnr-chevron-right").click(function() {
    $(this).toggleClass("toggle-right");
    $(".top").toggleClass("nav-wrapper-active");
    $(".bottom").toggleClass("nav-wrapper-active");
  });
  $(".lnr-plus-circle").click(function() {
    $(".nav-wrapper-alert").show();

    // $(".geomap").fadeIn(1000);

    $(this).toggleClass("toggle-right");
  });
  $(".lnr-earth").click(function() {
    $(this).toggleClass("toggle-right");
    $(".geomap").toggleClass("geomap-active");
  });
});
