// Here's some JS I wrote for the site

// Drop in the overflowable class to all slides, so that slides can be given a scrollbar
function set_overflowable() {
        overflow_window_size = Math.round($(window).innerHeight()-$('#headerContainer').innerHeight())-100;
        $(".overflowable").css({'height': overflow_window_size+"px", 'overflow-y': 'scroll', '-webkit-overflow-scrolling': 'touch'});
}

// Stop the user from loading more posts using the waitingReturn var
var waitingReturn = false;
var startIndex = 5;
current_location = window.location.pathname.split('/');
blog_index = current_location.indexOf('blog');

// If they're on a permanent link blog entry then they can't load more entries
if(blog_index && blog_index >= 0) {
  waitingReturn = true;
}

// Get more posts from the backend
function get_moar_posts() {
        if(!waitingReturn) {
                waitingReturn = true;
                // Start XMLHTTPRequest
                $.getJSON(
                        "blog/more/"+startIndex,
                        {},
                        function(json){
                                cHTML = ""
                                for(entry in json) {
                                        cHTML += "<section class=\"overflowable blog_entry future\"><div id=\""+json[entry]["id"]+"\"><h2><a class=\"blog_link\" href=\"/blog/"+json[entry]["id"]+"#/0/1\">"+json[entry]["title"]+"</a></h2><h4>"+json[entry]["date"]+"</h4><small>"+json[entry]["entry"].replace(/\\\n/g, '')+"</small></div></section>"
                }
                                $("#stream").append(cHTML);
                                startIndex += 5;
                                waitingReturn = false;
                                set_overflowable();
                                // Unless we're on the last slide already light the down arrow up in Reveal
                                if(!Reveal.isLastSlide()) {
                                        $(".controls .navigate-down").addClass("enabled")
                                } else {
                                        waitingReturn = true;
                                }
                        }
                );
        }
}

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

$(document).ready(function() {
        $("#pasttimes a, #nav_imgs a").bind('click',function(e){
                if(!confirm("You might leave this site by clicking OK")) e.preventDefault();
        });

        $("#0").parent().css('vertical-align', 'top');
        $("#1").parent().css('vertical-align', 'top');
        $("#2").parent().css('vertical-align', 'top');
        $("#3").parent().css('vertical-align', 'top');
        set_overflowable();

        /* Tap into the Reveal framework by adding an event listener
           when the slide changes; if we're on the last slide try to get
           more posts
         */
        Reveal.addEventListener('slidechanged', function() {
                if(Reveal.getCurrentSlide().classList.contains("blog_entry") && Reveal.isLastSlide()) {
                        get_moar_posts();
                }
        });

        var hasErrors = false;

        // Add some error detection, such as a lack of functionality in older versions of IE
        if(!$.support.cssFloat) {
                $('#errors').prepend('<p>Please upgrade to a later version of IE or another browser to view the full functionality of this website</p>');
                hasErrors = true;
        }

        // Detect if a user is holding their phone in portrait instead of landscape
        if(window.innerHeight > window.innerWidth) {
                $('#errors').prepend('<p>This site is best viewed in landscape mode</p>');
                hasErrors = true;
        }

        // Use the code above to determine if the user is on a mobile device
        if(jQuery.browser.mobile) {
                $('#errors').prepend('<p>This site is not optimized for mobile, please use a desktop browser for full functionality</p>');
                hasErrors = true;
        }

        if(hasErrors) {
                $('#errors').prepend('<p>Click any error to clear</p>');
        } else {
                $("#errors").css({'margin': '0 0 0 0'});
        }

        // Click on any error to clear them all
        $("#errors").bind('click', function(e) {
                $("#errors").empty();
                $("#errors").css({'margin': '0 0 0 0'});
        });
});

