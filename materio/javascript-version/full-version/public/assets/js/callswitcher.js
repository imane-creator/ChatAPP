$(document).ready(function()
{

    var getbody = document.getElementsByTagName('body');
    var createswitch = document.createElement('div');

    $(createswitch).attr
    (
        {
            id: 'createswitch',
        }
    )
    $(getbody).prepend(createswitch);

    $('#createswitch').load("public/colorswitcherassets/css/colorswitcher.html");
    
});