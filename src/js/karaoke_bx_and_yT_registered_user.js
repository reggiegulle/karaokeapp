$(document).ready(function () {
    /*
    * START
    * utility function
    * for animating the document
    * to the bxslider
    * with the YouTube iframe Player
    */
    function scrollToVidFrame() {
        //animate the document
        //to scroll up
        //to the hotel-1 slider
        $('html, body').animate({
            scrollTop: $('#yt-player').offset().top - 20
        }, 500);    
    }
    /*
    * utility function
    * for animating the document
    * to the bxslider
    * with the YouTube iframe Player
    * END
    */

    //assign a var to reference the dataTable API instance
    //(as initialised in karaoke_table.js)
    var videos_datatable = $('#videos_datatable').DataTable();
  
/*
* START
* functions and vars
* for karaoke-slider
*/
    
    /*
    * START
    * function for assembling
    * a karaoke-slider li item
    * for appending to
    * an error-free (correctly populated)
    * karaoke-slider
    * @param rowData (array),
    * @param lengh_pos_data (int)
    */
    function assembleErrorFreeKaraokeSliderItem(rowData, length_pos_data) {
        //form a value
        //to be assigned to
        //the 'alt' attribute of
        //each item img
        var songtitle = rowData[0],
            altsongtitlesplit = rowData[0].split(' '),
            altsongtitle = altsongtitlesplit.join('-'),
            karaoke_slider_li_item;
        
        //add this data to each karaoke-slider li
        //rowData[3] is a string that contains the video ID from YouTube
        karaoke_slider_li_item = '<li data-length_position="' + (length_pos_data) + '" data-video_id="' + rowData[3] + '">';
        karaoke_slider_li_item += '<div class="img-container">';
        karaoke_slider_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" width="100%" alt="' + altsongtitle + '-karaoke-video-thumbnail" title="' + songtitle + '">';
        karaoke_slider_li_item += '<div class="video-thumbnail-play-icon-overlay"></div>';
        karaoke_slider_li_item += '</div>';
        karaoke_slider_li_item += '<h6>';
        //rowData[0] is a string that contains the song title
        karaoke_slider_li_item += rowData[0];
        karaoke_slider_li_item += '</h6>';
        karaoke_slider_li_item += '<p>';
        //rowData[2] is a string that contains the song performer
        karaoke_slider_li_item += rowData[2];
        karaoke_slider_li_item += '</p>';
        karaoke_slider_li_item += '</li>';    
        
        return karaoke_slider_li_item;  
    }
    /*
    * function for assembling
    * a karaoke-slider li item
    * for appending to
    * an error-free (correctly populated)
    * karaoke-slider
    * END
    */
    
    /* 
    * START
    * helper function for
    * adding notifications to
    * the karaoke-slider li item
    * if the video and image is offline
    * at YouTube
    */
    function addOfflineNotifKarSlider() {
        //iterate through each of the newly-formed
        //karaoke-slider li items
        $('#karaoke-slider li img').each(function () {
            //get the src of the img
            var url = $(this).attr('src'),
                thisImage = $(this),
                thisImageDivParent = thisImage.parent('div'),
            //assign an empty variable
            //to represent a yet to be determined size
                size;
            //load an img into the browser memory
            //and get its size
            $('<img/>').attr('src', url).load(function () {
                //assign a value
                //to the size var above
                size = {width: this.width, height: this.height};
                if (size.width < 320) {
                    //if the size is smaller
                    //than the 'mqdefault' size
                    //of the thumbnail,
                    //replace with a notification
                    thisImageDivParent.html('<img src="images/no-video-black-with-text-320x180.jpg" width="100%" alt="No-video-available" title="No video available" class="karaoke-slider-no-video-notif">');
                }

            });
        });    
    }
    /* 
    * helper function for
    * adding notifications to
    * the karaoke-slider items
    * where the image is not online
    * at YouTube
    * END
    */

     /*
    * START
    * function for populating
    * an error-free karaoke-slider
    * @param slider (jQuery object as a variable),
    * @param thisRow (array),
    * @param rowData (array),
    * @param length_pos_index (int),
    * @param karaoke_slider_item (jQuery object),
    * @param karaoke_slider_vis_items (array),
    * @param videos_table_items_length (int)
    */
    function initErrorFreeKaraokeSlider(slider, thisRow, rowData, length_pos_index, karaoke_slider_item, karaoke_slider_vis_items, videos_table_items_length) { 
        //empty the karaoke-slider ul
        //of its li children
        //on every draw of the videos dataTable
        while ($('#karaoke-slider li').length > 0) {
            $('#karaoke-slider').empty();
        }
        
        //iterate through each row
        //of the rendered videos_datatable
        $('#videos_datatable tbody tr').each(function () {
            //increment the length_pos variable by 1
            //for each iteration
            length_pos_index++;
            
            thisRow = $(this);
            
            //get the JSON data from each video table row
            rowData = videos_datatable.row(thisRow).data();
            
            //per iteration,
            //form a karaoke-slider item
            karaoke_slider_item = assembleErrorFreeKaraokeSliderItem(rowData, length_pos_index);
            
            //insert the karaoke-slider li item
            //into the karaoke-slider ul
            $('#karaoke-slider').append(karaoke_slider_item);            
        });
        
        //reload the karaoke-slider bxslider
        slider.reloadSlider({
            minSlides: 2,
            maxSlides: 10,
            slideWidth: 200,
            moveSlides: 1,
            pager: false,
            hideControlOnEnd: true,
            infiniteLoop: false,
            onSliderLoad: function () {
                //invoke the function
                //for replacing offline YouTube 
                //videos and images
                //with a notification
                //in the affected
                //karaoke-slider li element
                addOfflineNotifKarSlider();
                
                //empty the array
                //'karaoke_slider_vis_items'
                karaoke_slider_vis_items.length = 0;
                
                //programatically fix the height
                //of the '.bx-viewport' wrapping div
                var bx_viewport_height = $('#karaoke-slider-container .bx-viewport').height();
                //programatically fix the height
                //of the karaoke-slider li elements
                //inside the '.bx-viewport' wrapping div
                $('#karaoke-slider li').css({
                    'height': bx_viewport_height + 'px' 
                });
                
                //iterate through each karaoke-slider li item
                //that has an attribute of
                //'aria-hidden="false"'
                $('#karaoke-slider li[aria-hidden="false"]').each(function () {
                    //assign a variable
                    //corresponding to the 'length_position' data
                    //of the li item
                    var thisVisibleItemIndex = $(this).data('length_position');
                    //add this data to
                    //the 'karaoke_slider_vis_items' array
                    karaoke_slider_vis_items.push(thisVisibleItemIndex);
                });
                
                //iterate through all the items of
                //the 'karaoke_slider_vis_items array
                for (i = 0; i < karaoke_slider_vis_items.length; i++) {
                    //if any one of the items is exactly equal to 1
                    if (karaoke_slider_vis_items[i] === 1) {
                        //hide the custom page turn buttons first
                        $('.bxslider-custom-page-turn').hide();
                        //then show the prev button
                        $('#prev-slider-page').show();    
                    }
                } 
            },
            onSlideAfter: function () {
                //empty the array
                //'karaoke_slider_vis_items'
                karaoke_slider_vis_items.length = 0;
                
                //hide the custom page turn buttons first
                $('.bxslider-custom-page-turn').hide();
                
                //iterate through each karaoke-slider item
                //that has an attribute of
                //'aria-hidden="false"'
                $('#karaoke-slider li[aria-hidden="false"]').each(function () {
                    //assign a variable
                    //corresponding to the 'length_position' data
                    //of the li item
                    var thisVisibleItemIndex = $(this).data('length_position');
                    //add this data to
                    //the 'karaoke_slider_vis_items' array
                    karaoke_slider_vis_items.push(thisVisibleItemIndex);
                });
                
                //iterate through all the items of
                //the 'karaoke_slider_vis_items array
                for (i = 0; i < karaoke_slider_vis_items.length; i++) {
                    //if any one of the items is exactly equal to 1
                    if (karaoke_slider_vis_items[0] === 1) {
                        //show the prev button
                        $('#prev-slider-page').show();
                    }
                    //if there are no items exactly equal to 1
                    if (karaoke_slider_vis_items[0] !== 1) {
                        //hide the custom page turn buttons
                        $('.bxslider-custom-page-turn').hide();
                    }
                    //if any one of the items is exactly equal to
                    //the number of displayed table rows
                    if (karaoke_slider_vis_items[i] === videos_table_items_length) {
                        //hide the custom page turn buttons first
                        $('.bxslider-custom-page-turn').hide();
                        //show the next button
                        $('#next-slider-page').show();        
                    }
                }
                
            }
        });
    }
    /*
    * END
    * function for populating
    * an error-free karaoke-slider
    */
    
    /*
     * START
    * function that controls
    * the behaviour of the
    * 'Prev Page' and 'Next Page' buttons
    * after the karaoke-slider ul element
    * has been initialized
    * @param currentTablePage (int),
    * @param tablePageTotal (int)
    * DataTables jQuery Plugin methods are used (.page, .draw)
    */
    function showOrHideCustomPageBtns(currentTablePage, tablePageTotal) {
        //based on the currentTablePage int above
        //if the value is exactly equal to (int)0
        if (currentTablePage === 0) {
            //hide the prev button
            $('#prev-slider-page').hide();    
        }
        //based on the currentTablePage data above
        //if the value is greater than 0
        if (currentTablePage > 0) {
            //go to the prev page of the table
            //when the prev page button is clicked
            $('#prev-slider-page').click(function () {
                videos_datatable.page(currentTablePage - 1).draw('page');    
            });    
        }
        //based on the tablePageTotal data above
        //while the value is less than
        //the tablePageTotal
        if (currentTablePage < tablePageTotal) {
            //go to the next page of the table
            //when the next page button is clicked
            $('#next-slider-page').click(function () {
                videos_datatable.page(currentTablePage + 1).draw('page');    
            });    
        }   
    }
    /*
    * function that controls
    * the behaviour of the
    * 'Prev Page' and 'Next Page' buttons
    * after the karaoke-slider ul element
    * has been initialized
    * END
    */
    
    /* START
    * behaviour of
    * karaoke-slider ul per every
    * draw of the videos dataTable
    * if the karaoke-slider ul
    * is assembled from a populated videos_datatable
    * @param datatable (jQuery object),
    * @param slider (jQuery object)
    */
    function loadErrorFreeKaraokeSlider(datatable, slider) {
        //assign an empty variable
        //to represent each videos table row
        var thisRow,
        //assign an empty variable
        //to represent videos table row data
            rowData,
        //pre-assign a "0" value
        //to a "length_pos_index" variable
        //which will increment per
        //iteration later
            length_pos_index = 0,
        //empty variable
        //to represent
        //each individual slider li item
        //for adding to the karaoke-slider ul
            karaoke_slider_item,
        //helper vars representing
        //integer data about
        //the video table's paging
        //using DataTable jQuery plugin's
        //API methods
            tablePageInfo = datatable.page.info(),
            tablePageTotal = tablePageInfo.pages,
            currentTablePage = datatable.page(),
        //assign an empty array to represent
        //the visible karaoke-slider li items in the
        //karaoke-slider ul
        //to be populated while
        //the slider moves
            karaoke_slider_vis_items = [],
        //get the length of the videos table
            videos_table_items_length = $('#videos_datatable tbody tr').length;
        
        //if a video table search DOES NOT return a
        //"No Results Found" message
        //(there were results)
        //assemble the karaoke-slider ul element
        initErrorFreeKaraokeSlider(slider, thisRow, rowData, length_pos_index, karaoke_slider_item, karaoke_slider_vis_items, videos_table_items_length);

        //invoke function for
        //showing or hiding the
        //'Prev Page' and 'Next Page' buttons
        //depending on the video table page
        showOrHideCustomPageBtns(currentTablePage, tablePageTotal)  
    }
    /*
    * behaviour of
    * karaoke-slider ul per every
    * draw of the videos dataTable
    * if the karaoke-slider ul
    * is assembled from a populated videos_datatable
    * END
    */
    
    /*
    * START
    * function for assembling
    * a karaoke-slider li item
    * for appending to
    * a karaoke-slider
    * coming from an empty or error-filled
    * videos_datatable
    */
    function assembleKaraokeSliderItemWithError() {
        var karaoke_slider_li_item;
        
        karaoke_slider_li_item = '<li data-length_position="1" data-video_id="8oXlq6t2yzU">';
        karaoke_slider_li_item += '<img src="https://i3.ytimg.com/vi/8oXlq6t2yzU/mqdefault.jpg" width="80%" alt="no-video-available-karaoke-video-thumbnail" title="No Video Available">';
        karaoke_slider_li_item += '<h6>';
        karaoke_slider_li_item += 'No Video Available';
        karaoke_slider_li_item += '</h6>';
        karaoke_slider_li_item += '<p>';
        karaoke_slider_li_item += 'Sorry, Please Try Another Search';
        karaoke_slider_li_item += '</p>';
        karaoke_slider_li_item += '</li>';      
        
        return karaoke_slider_li_item;      
    }
    /*
    * function for assembling
    * a karaoke-slider li item
    * for appending to
    * a karaoke-slider
    * coming from an empty or error-filled
    * videos_datatable
    * END
    */
    
    /*
    * START
    * function for assembling
    * a karaoke-slider li element
    * from an empty videos_dataTable
    */
    function initKaraokeSliderWithError(slider) {
        //empty the karaoke-slider li elements
        //on every draw of the videos dataTable
        while ($('#karaoke-slider li').length > 0) {
            $('#karaoke-slider').empty();
        }
        
        //assign a variable
        //for the karaoke-slider li item
        //to be appended to
        //the karaoke-slider ul
        var karaoke_slider_item = assembleKaraokeSliderItemWithError();
        
        $('#karaoke-slider').append(karaoke_slider_item);
        
         //reload the karaoke-slider bxslider
        slider.reloadSlider({
            minSlides: 1,
            maxSlides: 1,
            slideWidth: 200,
            moveSlides: 0,
            pager: false,
            hideControlOnEnd: true,
            infiniteLoop: false
        });            
    }
    /*
    * function for assembling
    * a karaoke-slider
    * from an empty videos_dataTable
    * END
    */
    
    /* START
    * behaviour of
    * karaoke-slider
    * from an empty videos_dataTable
    * (e.g. zero search results)
    */
    function loadKaraokeSliderWithError(slider) {
        initKaraokeSliderWithError(slider);    
    }
    /*
    * behaviour of
    * karaoke-slider
    * from an empty videos_dataTable
    * (e.g. zero search results)
    * END
    */
    
/*
* functions and vars
* for karaoke-slider
* END
*/
    
/*
* START
* function for showing
* or hiding
* the karaokedesclist ul li element
* depending on the karaoke-slider li element
* visible or active on the screen
* @param index (int)
*/
function showActiveDescListItem(index) {
    //hide all the karaoke description list items
    $('#karaokedesclist li').hide();
    //only show the list item that
    //is a match to the
    //karaoke-slider li element
    //that has an '.active' class
    $('#karaokedesclist li').eq(index).show();
}
/*
* function for showing
* or hiding
* the karaokedesclist ul li element
* depending on the karaoke-slider li element
* visible or active on the screen
* END
*/
    
/*
* START
* function for showing
* or hiding
* the karaokedesclist ul element
*/
function showOrHideKarDescList() {
    $('#showinfo').click(function () {
        //reveal the karaokedesclist element
        $('#karaokedesclist').show();
    }); 

    $('#hideinfo').click(function () {
        //hide the karaokedesclist element
        //(which is the default)
        $('#karaokedesclist').hide();    
    });
}
/*
* function for showing
* or hiding
* the karaokedesclist ul element
* END
*/ 
    
/*
* START
* YouTube iframe behaviour
*/
    
    //This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    //create a var
    //that will hold the
    //iframe API instance
    var player,
        karaoke_slider = $('#karaoke-slider').bxSlider(),
        currentActivSliderItm,
        nextActivSliderItm,
        videoIdToCue,
        currentLoadedVideoIdx,
        karaokeSplashH4,
        karaokeSplashP;
    
    /* START
    * function for determining
    * the transfer of the .active class
    * between karaoke-slider li items and
    * videos_datatable items, as well as
    * the showing or hiding of karaokedesclist li items
    * when the YT Player cues or loads one video after another
    * @param goToNext (bool),
    * @param currentActivSliderItm (jQuery object[the $('#karaoke-slider li.active') item]),
    * @param nextActivSliderItm (jQuery object),
    * @param videoIdToCue (string),
    * @param currentLoadedVideoIdx (int),
    * @param karaokeSplashH4 (string),
    * @param karaokeSplashP (string)
    */
    function videoAndActivItmTransition() {
        currentActivSliderItm.removeClass('active');
        nextActivSliderItm.addClass('active');
        currentActivSliderItm = nextActivSliderItm; 
        videoIdToCue = currentActivSliderItm.data('video_id');
        currentLoadedVideoIdx = currentActivSliderItm.data('length_position') - 1;
        karaokeSplashH4 = currentActivSliderItm.find('h6').text();
        karaokeSplashP = currentActivSliderItm.find('p').text();
        $('.karaoke-splash-details h4').text(karaokeSplashH4);
        $('.karaoke-splash-details p').text(karaokeSplashP);
        $('#videos_datatable tbody tr.active').removeClass('active');
        $('#videos_datatable tbody tr').not('.child').eq(currentLoadedVideoIdx).addClass('active');
    }
    /* 
    * function for determining
    * the transfer of the .active class
    * between karaoke-slider li items and
    * videos_datatable items, as well as
    * the showing or hiding of karaokedesclist li items
    * when the YT Player cues or loads one video after another
    * @param goToNext (bool),
    * @param currentActivSliderItm (jQuery object[the $('#karaoke-slider li.active') item]),
    * @param nextActivSliderItm (jQuery object),
    * @param videoIdToCue (string),
    * @param currentLoadedVideoIdx (int),
    * @param karaokeSplashH4 (string),
    * @param karaokeSplashP (string)
    * END
    */
    
    /*START
    * function for clearing
    * the videoCueTimeout 
    * window.timeOut object
    */
    function clearVideoCueTimeout(videoCueTimeout) {
         if(videoCueTimeout) {
                window.clearTimeout(videoCueTimeout); 
         } else {
             return;
         }    
    }
    /*
    * function for clearing
    * the videoCueTimeout 
    * window.timeOut object
    * END
    */
    
    /*
    * START
    * new window object
    * that is specified by
    * the YouTube Iframe API
    * for initialising
    * an iframe that functions as
    * a YouTube embedded player
    */
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('yt-player', {
            height: '100%',
            width: '100%',
            videoId: '',
            //YouTube iframe player
            //parameters and corresponding values
            playerVars: {
                //YouTube's HTML5 player is used
                'html5': 1,
                //should play inline in most
                //modern mobile devices
                'playsinline': 1,
                //a value of '3' means
                //that YouTube video annotations
                //are not shown by default
                'iv_load_policy': 3
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });    
    };
    /*
    * new window object
    * that is specified by
    * the YouTube Iframe API
    * for initialising
    * an iframe that functions as
    * a YouTube embedded player
    * END
    */
    
    function onPlayerReady(event) { 
        
        //call function
        //for assembling a fully populated
        //karaoke-slider ul
        //(on first load of the page,
        //the karaoke-slider is always populated)
        loadErrorFreeKaraokeSlider(videos_datatable, karaoke_slider);
        
        //then add an 'active' class to
        //the first li element of karaoke-slider
        currentActivSliderItm = $('#karaoke-slider li').first().addClass('active');
        //and also to the first row of
        //the videos datatable
        $('#videos_datatable tbody tr').first().addClass('active');
        
        //set var currentLoadedVideoIdx to '0' 
        currentLoadedVideoIdx = 0;
        
        //grab some relevant text from
        //the 'h6' and 'p' tags of
        //the 'karaoke-slider li.active' element
        //and place them in the relevant
        //'karaoke-splash-details' tags
        karaokeSplashH4 = currentActivSliderItm.find('h6').text();
        karaokeSplashP = currentActivSliderItm.find('p').text();
        $('.karaoke-splash-details h4').text(karaokeSplashH4);
        $('.karaoke-splash-details p').text(karaokeSplashP);
        
        //set the var 'videoIdToCue' by
        //getting the 'video_id' string data
        //attached to the 'karaoke-slider li.active' element
        videoIdToCue = currentActivSliderItm.data('video_id');

        //use the data
        //to cue a video in the yt-player
        player.cueVideoById(videoIdToCue);
        
        //invoke the function for
        //showing the relevant
        //karaokedesclist li item
        //and hiding the irrelevant ones
        showOrHideKarDescList();
        
        /*
        * START
        * behaviour of each
        * 'play button' overlaid on
        * each thumbnail in
        * every 'karaoke-slider li' element
        * when clicked
        */
        $('#karaoke-slider li .video-thumbnail-play-icon-overlay').click(function () {    

            //set the new active
            //'karaoke-slider li' item
            nextActivSliderItm = $(this).parents('li');

            //trasition to new video
            //and new active items
            videoAndActivItmTransition();

            //only show the
            //relevant karaokedesclist li item
            showActiveDescListItem(currentLoadedVideoIdx);

            //play the designated video
            player.loadVideoById(videoIdToCue);    

            //move the 'karaoke-slider'
            //to the active li element
            karaoke_slider.goToSlide(currentLoadedVideoIdx);

            //animate the browser window
            //to the X position
            //of the yt-player iframe
            scrollToVidFrame();
        });
        /*
        * behaviour of each
        * 'play button' overlaid on
        * each thumbnail in
        * every 'karaoke-slider li' element
        * when clicked
        * END
        */
        
        /*
        * START
        * behaviour of each
        * 'play button' overlaid on
        * each thumbnail in
        * every 'videos_datatable' row
        * when clicked
        */
        $('#videos_datatable tbody tr td .video-thumbnail-play-icon-overlay').click(function () {
            
            //set the new active
            //'karaoke-slider li' item
            nextActivSliderItm = $('#karaoke-slider li').eq($(this).parents('tr').data('index_position'));
            
            //trasition to new video
            //and new active items
            videoAndActivItmTransition();

            //only show the
            //relevant karaokedesclist li item
            showActiveDescListItem(currentLoadedVideoIdx);
            
            //play the designated video
            player.loadVideoById(videoIdToCue);    
            
            //move the 'karaoke-slider'
            //to the active li element
            karaoke_slider.goToSlide(currentLoadedVideoIdx);
            
            //animate the browser window
            //to the X position
            //of the yt-player iframe
            scrollToVidFrame();
        });
        /*
        * behaviour of each
        * 'play button' overlaid on
        * each thumbnail in
        * every 'videos_datatable' row
        * when clicked
        * END
        */
        
        /*
        * START
        * behaviour of 
        * the 'prev' and 'next' arrows
        * overlaid on the yt-player
        * left and right sides
        * when clicked
        */
        $('#next-arrow').click(function () {
            
            //set the value of
            //the currentActivSliderItm var
            currentActivSliderItm = $('#karaoke-slider li.active');
            
            
            //if the next item is the LAST
            //slider or table item
            if (currentActivSliderItm.data('length_position') == $('#karaoke-slider li').length) {
                
                //set the first 'karaoke-slider li' item
                //as the new active item
                nextActivSliderItm = $('#karaoke-slider li').first();
                
                //trasition to new video
                //and new active items
                videoAndActivItmTransition();
                
                //cue (not play) the designated video
                player.cueVideoById(videoIdToCue);
                
                //move the 'karaoke-slider'
                //to the active li element
                karaoke_slider.goToSlide(currentLoadedVideoIdx);
                
            //if the next item is NOT the LAST
            //slider or table item
            } else if (currentActivSliderItm.data('length_position') < $('#karaoke-slider li').length) {
                
                //set the new active
                //'karaoke-slider li' item
                nextActivSliderItm = currentActivSliderItm.next();
                
                //trasition to new video
                //and new active items
                videoAndActivItmTransition();
                
                //cue (not play) the designated video
                player.cueVideoById(videoIdToCue);
                
                //move the 'karaoke-slider'
                //to the active li element
                karaoke_slider.goToSlide(currentLoadedVideoIdx);
            }
        });
        
        $('#prev-arrow').click(function () {
            
            //set the value of
            //the currentActivSliderItm var
            currentActivSliderItm = $('#karaoke-slider li.active');
            
            //if the previous item is the FIRST
            //slider or table item
            if (currentActivSliderItm.data('length_position') == 1) {
                
                //set the last 'karaoke-slider li' item
                //as the new active item
                nextActivSliderItm = $('#karaoke-slider li').last();
                
                //trasition to new video
                //and new active items
                videoAndActivItmTransition();
                
                //cue (not play) the designated video
                player.cueVideoById(videoIdToCue);
                
                //move the 'karaoke-slider'
                //to the active li element
                karaoke_slider.goToSlide(currentLoadedVideoIdx);
                
            //if the previous item is NOT the FIRST
            //slider or table item   
            } else if (currentActivSliderItm.data('length_position') > 0) {
                
                //set the new active
                //'karaoke-slider li' item
                nextActivSliderItm = currentActivSliderItm.prev();
                
                 //trasition to new video
                //and new active items
                videoAndActivItmTransition();
                
                //cue (not play) the designated video
                player.cueVideoById(videoIdToCue);
                
                //move the 'karaoke-slider'
                //to the active li element
                karaoke_slider.goToSlide(currentLoadedVideoIdx);
            }
        });
        /*
        * behaviour of 
        * the 'prev' and 'next' arrows
        * overlaid on the yt-player
        * left and right sides
        * when clicked
        * END
        */

        videos_datatable.on('draw.dt', function () {
            
            //since this comes after a re-draw
            //of the videos_datatable,
            //the table might be empty,
            //i.e., after a search with no results
            //so there are two conditions
            
            //if the videos_datatable has one or more
            //valid rows
            if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1){
                
                //the function for
                //loading a slider
                //with no 'error' content
                //is called
                loadErrorFreeKaraokeSlider(videos_datatable, karaoke_slider);
                
            //however, if the videos_datatable
            //has no valid rows
            } else if ($('#videos_datatable tbody tr td.dataTables_empty').length > 0){
                
                //the function for
                //loading a slider
                //with an 'error' content
                //is called
                loadKaraokeSliderWithError(karaoke_slider);    
            }
            
            
            //then add an 'active' class to
            //the first li element of karaoke-slider
            currentActivSliderItm = $('#karaoke-slider li').first().addClass('active');
            $('#videos_datatable tbody tr').first().addClass('active');
            
            //set var currentLoadedVideoIdx to '0'
            currentLoadedVideoIdx = 0;
            
            //grab some relevant text from
            //the 'h6' and 'p' tags of
            //the 'karaoke-slider li.active' element
            //and place them in the relevant
            //'karaoke-splash-details' tags
            karaokeSplashH4 = currentActivSliderItm.find('h6').text();
            karaokeSplashP = currentActivSliderItm.find('p').text();
            $('.karaoke-splash-details h4').text(karaokeSplashH4);
            $('.karaoke-splash-details p').text(karaokeSplashP);
            
            //set the var 'videoIdToCue' by
            //getting the 'video_id' string data
            //attached to the 'karaoke-slider li.active' element
            videoIdToCue = currentActivSliderItm.data('video_id');
            
            //use the data
            //to cue a video in the yt-player
            player.cueVideoById(videoIdToCue);
            
            //invoke the function for
            //showing the relevant
            //karaokedesclist li item
            //and hiding the irrelevant ones
            showOrHideKarDescList();
            
            $('#karaoke-slider li .video-thumbnail-play-icon-overlay').click(function () {   

                //set the new active
                //'karaoke-slider li' item
                nextActivSliderItm = $(this).parents('li');

                //trasition to new video
                //and new active items
                videoAndActivItmTransition();

                //only show the
                //relevant karaokedesclist li item
                showActiveDescListItem(currentLoadedVideoIdx);

                //play the designated video
                player.loadVideoById(videoIdToCue);    

                //move the 'karaoke-slider'
                //to the active li element
                karaoke_slider.goToSlide(currentLoadedVideoIdx);

                //animate the browser window
                //to the X position
                //of the yt-player iframe
                scrollToVidFrame();

            });
            
            $('#videos_datatable tbody tr td .video-thumbnail-play-icon-overlay').click(function () { 

                //set the new active
                //'karaoke-slider li' item
                nextActivSliderItm = $('#karaoke-slider li').eq($(this).parents('tr').data('index_position'));

                //trasition to new video
                //and new active items
                videoAndActivItmTransition();

                //only show the
                //relevant karaokedesclist li item
                showActiveDescListItem(currentLoadedVideoIdx);

                //play the designated video
                player.loadVideoById(videoIdToCue);    

                //move the 'karaoke-slider'
                //to the active li element
                karaoke_slider.goToSlide(currentLoadedVideoIdx);

                //animate the browser window
                //to the X position
                //of the yt-player iframe
                scrollToVidFrame();
                
            });
            
        });
    }
    
    
    
    function onPlayerStateChange(event) {
        
        if (event.data === 5) { //if the video has been cued
            
            //set the value of
            //the currentActivSliderItm var
            currentActivSliderItm = $('#karaoke-slider li.active');
            
            //if it happens that
            //the 'karaoke-slider li.active'
            //is 'hidden', e.g. is placed
            //beyond the edge of the slider
            if ($('#karaoke-slider li.active').is('[aria-hidden = "true"]')) {
                //move the 'karaoke-slider'
                //to the active li element
                karaoke_slider.goToSlide(currentLoadedVideoIdx);    
            }
            
            //if it happens that
            //the 'karaoke-splash-details-container' elem
            //is hidden, show it
            if ($('.karaoke-splash-details-container').is(':hidden')) {
                $('.karaoke-splash-details-container').show();    
            }
            
            //if it happens that
            //the 'hideinfo' button
            //is visible
            if ($('#info-buttons ul li#hideinfo').is(':visible')) {
                //hide it
                $('#info-buttons ul li#hideinfo').hide();
                //hide the karaokedesclist ul
                $('#karaokedesclist').hide();
                //show the 'showinfo' button
                $('#info-buttons ul li#showinfo').show();    
            }
            
            //only show the
            //relevant karaokedesclist li item
            showActiveDescListItem(currentLoadedVideoIdx);
            
        }
        
        if (event.data === 1) { //if the video is playing
            
            //when the video is playing
            //gradually fade the splash details out
            if ($('.karaoke-splash-details-container').is(':visible')) {
                $('.karaoke-splash-details-container').fadeOut();    
            }
            
            //set var currentLoadedVideoIdx
            //to the index position
            //of the 'karaoke-slider li.active' item
            currentLoadedVideoIdx = $('#karaoke-slider li.active').data('length_position') - 1;
            
            //move the 'karaoke-slider'
            //to the active li element
            karaoke_slider.goToSlide(currentLoadedVideoIdx);
            
            //only show the
            //relevant karaokedesclist li item
            showActiveDescListItem(currentLoadedVideoIdx);
        }
        
        //if the video has been paused (different from just ended)
        if (event.data === 2) {
            
            //set var currentLoadedVideoIdx
            //to the index position
            //of the 'karaoke-slider li.active' item
            currentLoadedVideoIdx = $('#karaoke-slider li.active').data('length_position') - 1;
            
            //move the 'karaoke-slider'
            //to the active li element
            karaoke_slider.goToSlide(currentLoadedVideoIdx);
            
        }
        
        //if the video has ended (different from just paused)
        if (event.data === 0) { 
            
            //if it happens that
            //the 'hideinfo' button
            //is visible
            if ($('#info-buttons ul li#hideinfo').is(':visible')) {
                //hide it
                $('#info-buttons ul li#hideinfo').hide();
                //hide the karaokedesclist ul
                $('#karaokedesclist').hide();
                //show the 'showinfo' button
                $('#info-buttons ul li#showinfo').show();    
            }
            
            //if the 'karaoke-slider li.active' item's index position
            //is NOT EQUAL to the length of the list,
            //i.e., it's NOT THE LAST li item,
            if (currentActivSliderItm.data('length_position') != $('#karaoke-slider li').length) {
                
                //set the next 'karaoke-slider li' item
                //as the new active item
                nextActivSliderItm = currentActivSliderItm.next();
                
                //trasition to new video
                //and new active items
                videoAndActivItmTransition(); 
            
            //if the 'karaoke-slider li.active' 
            //IS THE LAST li item,    
            } else if (currentActivSliderItm.data('length_position') == $('#karaoke-slider li').length) {
                
                //set the first 'karaoke-slider li' item
                //as the next active item
                nextActivSliderItm = $('#karaoke-slider li').first();
                
                //trasition to new video
                //and new active items
                videoAndActivItmTransition();
                
            }
            
            //play the video indicated by
            //the new 'karaoke-slider li' item
            player.loadVideoById(videoIdToCue);
            
            //move the 'karaoke-slider'
            //to the active li element
            karaoke_slider.goToSlide(currentLoadedVideoIdx);
        }
        
    }
    
    function onPlayerError(event) {
        
        if (event.data === 100 || event.data === 101) {
            
            var prevVideoIdLoadedSrcSliderItm = $('#karaoke-slider li.active'),
                nextVideoIdToLoadSrcSliderItm = $('#karaoke-slider li.active').next(),
                nextVideoIdToLoad = nextVideoIdToLoadSrcSliderItm.data('video_id');
            
            prevVideoIdLoadedSrcSliderItm.removeClass('active');
            
            nextVideoIdToLoadSrcSliderItm.addClass('active');
            
            player.loadVideoById(nextVideoIdToLoad);    
        }
    }
/*
* YouTube iframe behaviour
* END
*/
    
});