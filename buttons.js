/**
 * Adds the download button in a few particular locations
 * Once clicked it opens up the interface
 * This is set up in such a way as to avoid it completely breaking due
 * to minor changes in Twitter's structure or layout
 * Commented very verbosely so the layman can understand this doesn't steal information
 * @author @AnotherBlacKid
 */
(function(){
    var tweet_class = "tweet";
    var share_button_class = "ProfileTweet-action--more";

    var download_button = document.createElement("li");
    download_button.class = "download-tweet"
    download_button.innerHTML = "<button type=\"button\" class=\"dropdown-link\">Download As Image</button>";

    /**
     * Obtains some information from the tweet and then passes said information to
     * the interface so that the interface can make a picture out of it
     * 
     * @param e - The event information obtained from the EventListener
     */
    function makeThatShit ( e ) {
        // rev up those friers 
        this.tweetTarget.querySelector("."+share_button_class+" .dropdown").classList.remove("open");
        TweetDownloaderInterface.setTweet( this.tweetTarget );
        e.preventDefault();
        return false;
    }
    download_button.addEventListener( "click", makeThatShit );
    /** 
     * Dynamically add the download button as items are clicked in order
     *  to avoid the hastle of dealing with Twitter's AJAX and infinite scroll
     * @param e - The event information obtained from the EventListener
     */
    function dynamicButtonAddition ( e ) {
        //console.log( e );
        var target = e.target;
        var clicked_dropdown = false;
        // percolate upwards through DOM until we hit the tweet root or body element
        while ( !target.classList.contains( tweet_class ) && target != document.body ){
            // Check if we actually clicked the menu button and not somewhere else on the tweet
            if ( target.classList.contains ( share_button_class ) ) 
                clicked_dropdown = true;

            target = target.parentElement;
        }
        // if we make it to the body element then we've gone too far
        if ( !clicked_dropdown || target == document.body ) return;
        // find the share button
        var share_button = target.getElementsByClassName( share_button_class )[0];
        // use the share button to find dropdown menu
        var dropDown_menu = share_button.getElementsByTagName("ul")[0];
        // add the button to the dropdown menu
        dropDown_menu.prepend( download_button );
        // set the download button target
        download_button.tweetTarget = target;
    }
    // add listener to body
    document.body.addEventListener( "mousedown", dynamicButtonAddition );
})();