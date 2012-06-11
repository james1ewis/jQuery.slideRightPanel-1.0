(function ($) {

    var _animationSpeed = 500;

    $.fn.slidePanel = function (options) {

        var settings = {
            opacity: 0.8,
            bgColour: "black",
            tabwidth: 100,
            attachTo: "right",
            contentHeight: 0,
            contentWidth: 175,
            tabHeight: 0,
            tabWidth: 50,
            event: "click",
            animationSpeed: 500
        };

        if (options) {
            $.extend(settings, options);
        }

        _animationSpeed = settings.animationSpeed;

        // get the divs
        $wrapper = $(this);
        $tab = $(this).find("#panel-tab");
        $slider = $(this).find("#panel-content");

        // hide in case of flicker
        $wrapper.css('opacity', '0');
        $slider.hide();

        // setup the css attributes
        // TODO - IF, settings.attachTo = right...
        $wrapper.css(wrapperRightCss);
        $tab.css(tabRightCss);
        $slider.css(contentRightCss);

        // setup height / width based on orientation
        if (settings.attachTo == "right") {
            $tab.css('width', settings.tabWidth + 'px');
            $slider.css('width', settings.contentWidth + 'px');
        }
        if (settings.attachTo == "top") {
            $tab.css('height', settings.tabHeight + 'px');
            $slider.css('height', settings.contentHeight + 'px');
        }

        // set background colour and opacity
        $tab.css({            
            opacity: settings.opacity,
        });
        $slider.css({
            backgroundColor: settings.bgColour,
            opacity: settings.opacity,            
        });

        // set the image stuff up if we're using an image
        if(settings.tabImgSrc)
            SetupImageStuff();

        // set settings for tab content - can't have margins on images or p
        $($tab, "p, img").css('margin', '0');
//        $($tab, "img").css('margin', '0');

        // setup the events
        if(settings.event == "click")
        {
            // todo - write debouncing code with a timer

            $tab.click(showIfNotVisibleRight(event)); // todo - check orientation
            $("html").click(hideIfNotVisibleRight(event));
        }
        else if (settings.event == "hover")
        {
            // todo - write debouncing code with a timer

            $tab.mouseenter(showIfNotVisibleRight(event)); // todo - check orientation
            $("html").mouseleave(hideIfNotVisibleRight(event));
        }

        $wrapper.css('opacity', '1');

        return this;
    };

    function showIfNotVisibleRight(event) 
    {
        event.stopPropagation();
        $element = event.target;
        
        if (($element).is(":visible"))
            return;

        $(element).animate({ width: 'toggle' }, _animationSpeed);        
    }

    function hideIfNotVisibleRight(event)
    {
        event.stopPropagation();
        $element = event.target;
        
        if (($element).is(":hidden"))
            return;

        $(element).animate({ width: 'toggle' }, _animationSpeed);        
    }
    
    function SetupImageStuff()
    {
         return;
    }

    // css for the wrapper
    var wrapperRightCss = {
        position: "absolute",
        background: "transparent",
        height: "100%",
        right: 0
    };
    var wrapperTopCss = {
        position: "absolute",
        background: "transparent",
        width: "100%",
        top: 0
    };

    // css for the tab
    var tabRightCss = {
        position: "relative",
        height: "100%",
        backgroundColor: "transparent",
        float: "left"
    };
    var tabTopCss = {
        position: "relative",
        width: "100%",
        backgroundColor: "transparent"
    };

    // css for the content
    var contentRightCss = {
        position: "relative",
        height: "100%",
        float: "right"
    };
    var contentTopCss = {
        position: "relative",
        width: "100%"
    };
}, (jQuery))    