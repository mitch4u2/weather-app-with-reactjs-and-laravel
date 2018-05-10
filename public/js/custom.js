$(function() {
  $(".go-up").click(function() {
    $(this).toggleClass("toggle-up");
    $(".top").slideToggle("slow");
    $(".forecast").css("max-height", "100%");
  });
  $(".lnr-chevron-left").click(function() {
    $(this).toggleClass("toggle-right");
  });
  $(".lnr-plus-circle").click(function() {
    $(".nav-wrapper-alert").show();
    $(".nav-wrapper-alert").toggleClass("nav-wrapper-active");

    $(this).toggleClass("toggle-right");
  });
  $(".lnr-earth").click(function() {
    $(this).toggleClass("toggle-right");
  });
});
