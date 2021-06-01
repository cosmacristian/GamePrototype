'use strict';
$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        toggleSideBar();
    });

    if ($('.device-xs').is(':visible')) {
        toggleSideBar();
    }

    $('#navbarContainer').removeClass('hidden-xs');


    function toggleSideBar() {
        $('#mainContent').toggleClass('narrow');
        $('#navbarContainer').toggleClass('collapsed');
    }
});