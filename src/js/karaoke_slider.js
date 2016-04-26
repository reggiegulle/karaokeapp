$(document).ready(function () {
/*if (registered === 'black') {
    console.log('Hellow Worled');
} else if (registered === 'green') {
    console.log('I am logged in!');
}*/
    
    
    /* 
    * utility function for
    * window resize Event
    * Code from this StackOverflow answer: http://stackoverflow.com/a/4541963/34155
    */
    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "failedID";
            }
            if (timers.uniqueId) {
                clearTimeout(timers.uniqueId);
            }
            timers.uniqueId = setTimeout(callback, ms);
        };
    })();
    
    
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
            scrollTop: $('#karaoke-slider-1').offset().top 
        },500);    
    }
    /*
    * utility function
    * for animating the document
    * to the bxslider
    * with the YouTube iframe Player
    * END
    */
    
    //assign a variable to the
    //karaoke-slider-1 element
    //and initialize it as
    //a new bxslider instance
    var karaoke_slider_1 = $('#karaoke-slider-1').bxSlider(),
    
    //assign a variable to the
    //karaoke-slider-2 element
    //and initialize it as
    //a new bxslider instance
    karaoke_slider_2 = $('#karaoke-slider-2').bxSlider(),

    //assign "hoteltable" dataTable API instance
    videos_datatable = $('#videos_datatable').DataTable();
    
    /*
    * START
    * utility function for
    * adding an 'active' class
    * to the karaoke-slider-2 element
    * that is in sync with the
    * current karaoke-slider-1 item displayed
    */
    function addActiveClass(sliderElement, index) {
        switch (sliderElement) {
            //if the sliderElement specified is 'karaoke-slider-1'
            case 'karaoke-slider-1':
                //first remove the class 'active'
                //from all karaoke-slider-2 li items
                $('#karaoke-slider-2 li').removeClass('active');
                //then add an 'active' class to
                //the eq position specified by the index argument
                $('#karaoke-slider-2 li').eq(index).addClass('active');
                //then remove the class 'active'
                //from all videos table tr items
                $('#videos_datatable tbody').find('tr.active').removeClass('active');
                //then add an 'active' class to
                //the table row with the 
                //eq position specified by the index argument
                $('#videos_datatable tbody tr').eq(index).addClass('active');
            break;
            //if the sliderElement specified is 'karaoke-slider-2'
            case 'karaoke-slider-2':
                //first remove the class 'active'
                //from all karaoke-slider-2 li items
                $('#karaoke-slider-2 li').removeClass('active');
                //then add an 'active' class to
                //the first li element of karaoke-slider-2
                $('#karaoke-slider-2 li').eq(0).addClass('active');
                //then remove the class 'active'
                //from all videos table tr items
                $('#videos_datatable tbody').find('tr.active').removeClass('active');
                //then add an 'active' class to
                //the first tr of the videos table
                $('#videos_datatable tbody tr').eq(0).addClass('active');
            break;
            default:
            break;
        }
    }
    /*
    * utility function for
    * adding an 'active' class
    * to the karaoke-slider-2 element
    * that is in sync with the
    * current karaoke-slider-1 item displayed
    * END
    */
    
/*
* START
* functions and vars
* for karaoke-slider-1
*/
    /*
    * START
    * function for adding an error slide
    * for appending to 
    * the karaoke-slider-1 element
    * if the videos datatable
    * returns no items
    * (i.e., Null search results)
    */
    function renderKaraoke1SliderErrorState() {
        //remove items from upper bxslider ("karaoke-slider-1")
        //right after each rendering of the videos datatable
        while($('#karaoke-slider-1 li').length > 0){
            $('#karaoke-slider-1').empty();
        }
        
        //assemble the
        //error notification list item
        var karaoke_slider_1_error_item = '<li class="no_results">';
        karaoke_slider_1_error_item += '<p>';
        karaoke_slider_1_error_item += 'Sorry, no search results found.  Please try again.';
        karaoke_slider_1_error_item += '</p>';
        karaoke_slider_1_error_item += '</li>';
        
        //append the error slide
        //in the karaoke-slider-1 bxslider
        $('#karaoke-slider-1').append(karaoke_slider_1_error_item);
        
        //reload the karaoke_slider_1 bxslider
        karaoke_slider_1.reloadSlider();
    }
    /*
    * END
    * function for adding an error slide
    * for appending to 
    * the karaoke-slider-1 element
    * if the videos datatable
    * returns no items
    * (i.e., Null search results)
    */
    
    /*
    * START
    * function for assembling
    * a karaoke-slider-1 li item
    * for appending to
    * an error-free karaoke-slider-1
    */
    function assembleKaraokeSlider1Item(rowData, index_data) {
        //form a value
        //to be assigned to
        //the 'alt' attribute of
        //each item img
        var songtitle = rowData[0],
            altsongtitlesplit = rowData[0].split(' '),
            altsongtitle = altsongtitlesplit.join('-');
        
        //add this content to each karaoke-slider-1 li
        var karaoke_slider_1_li_item = '<li class="karaoke-slider-1-slide" data-index_position="' + index_data + '" data-video_id="' + rowData[3] + '">';
        karaoke_slider_1_li_item += '<div class="karaoke-slider-1-slide-player-container"></div>';
        karaoke_slider_1_li_item += '<div class="karaoke-slider-1-slide-controls">';
        //rowData[3] below
        //corresponds to the
        //YouTube video id
        karaoke_slider_1_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/hqdefault.jpg" width="100%" alt="' + altsongtitle + '-karaoke-video-thumbnail" title="' + songtitle + '">';
        karaoke_slider_1_li_item += '<button class="karaoke-slider-1-play-button">Play</button>';
        karaoke_slider_1_li_item += '<div class="karaoke-splash-details">';
        karaoke_slider_1_li_item += '<h4>' + songtitle + '</h4>';
        //rowData[2] below
        //corresponds to
        //the song performer's name
        karaoke_slider_1_li_item += '<p>' + rowData[2] + '</p>';
        karaoke_slider_1_li_item += '</div>';
        karaoke_slider_1_li_item += '</div>';
        karaoke_slider_1_li_item += '</li>';
        
        //return a fully-formed
        //li item
        return karaoke_slider_1_li_item;
    }
    /*
    * function for assembling
    * a karaoke-slider-1 li item
    * for appending to
    * an error-free karaoke-slider-1
    * END
    */
    
    /* 
    * START
    * helper function for
    * adding notifications to
    * the karaoke-slider-1 items
    * where the image is not online
    * at YouTube
    */
    function addOfflineNotifKarSlider1() {
        //iterate through each of the newly-formed
        //karaoke-slider-1 li img items
        $('#karaoke-slider-1 li img').each(function () {
            //get the src of the img
            var url = $(this).attr('src'),
            thisImage = $(this),
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
                    //first, remove the play button
                    //of the element
                    thisImage.siblings('.karaoke-slider-1-play-button').remove();
                    
                    //then this image to be
                    //replaced with a notification
                    thisImage.replaceWith('<div class="offline-notification">Sorry, video is unavailable</div>')
                }

            });
        });    
    }
    /* 
    * helper function for
    * adding notifications to
    * the karaoke-slider-1 items
    * where the image is not online
    * at YouTube
    * END
    */
    
    /*
    * START
    * function for replacing
    * a karaoke-slider-1 image
    * with a YouTube iframe
    */
    function karSlider1PlayBtnAxn() {
        $('button.karaoke-slider-1-play-button').click(function () {
            //reference the helper variable
            if (registered === 'black') {
                //pause the autoplay
                //of the karaoke-slider-1 element
                karaoke_slider_1.stopAuto();    
            }
            
            //get the video ID 
            var video_id = $(this).parents('li.karaoke-slider-1-slide').data('video_id'),
            //assign a var to
            //the 'controls' div
            //that will be hidden
            thisParentControls = $(this).parent('div.karaoke-slider-1-slide-controls'),
            //assign a var to
            //the 'player container' div
            //that will become visible
            //(by default, it is hidden)
            thisSlidePlayerContainer = thisParentControls.siblings('div.karaoke-slider-1-slide-player-container');
            
            //hide the 'controls' div
            thisParentControls.hide();
            //insert iframe content
            //to the 'player container' div
            thisSlidePlayerContainer
                .html('<iframe id="ytplayer" type="text/html" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&rel=0&controls=2&rel=0 frameborder="0"/>')
            //make the div visible
                .show();
        });    
    } 
    /*
    * function for replacing
    * a karaoke-slider-1 image
    * with a YouTube iframe
    * END
    */

    /*
    * START
    * function for removing iframes in 
    * karaoke-slider-1 li items
    * and returning the normal content
    * to the li item
    */
    function afterTransitionKarSlider1IframeBehaviour() {
        //first, detect if there is at least one iframe
        //present inside the karaoke-slider-1 element
        if ($('#karaoke-slider-1 iframe').length > 0) {
            //assign a variable
            //to the currently visible
            //'player-container' div
            var karIframeContainer = $('#karaoke-slider-1 iframe').parent('div.karaoke-slider-1-slide-player-container'),
            //assign a variable
            //to the currently hidden
            //'slide-controls' div
            karSlider1Controls = karIframeContainer.siblings('div.karaoke-slider-1-slide-controls');
            
            //remove the iframe
            karIframeContainer.empty();
            //hide the 'player-container' div
            karIframeContainer.hide();
            //make the 'slide-controls' div
            //visible again
            karSlider1Controls.show();
            
            //reference the helper var
            if (registered === 'black') {
                //restart the autoplaying slideshow
                //process of bxslider
                karaoke_slider_1.startAuto();    
            } 
        }
    }
    /*
    * function for removing iframes in 
    * karaoke-slider-1 li items
    * and returning the normal content
    * to the li item
    * END
    */
    
    /*
    * START
    * function for appending li items to 
    * the karaoke-slider-1 element
    * if the videos datatable
    * has valid items
    */
    function initKaraokeSlider1(registered, thisRow, rowData, video_index, karaoke_slider_1_item, videos_table_items_length, currentTablePage, tablePageTurn) {
        //remove items from upper bxslider ("karaoke-slider-1")
        //right after each rendering of the videos datatable
        while($('#karaoke-slider-1 li').length > 0){
            $('#karaoke-slider-1').empty();
        }
        
        //function for making the video table
        //go to its next page
        function goToNextTablePage() {
            videos_datatable.page(currentTablePage + 1).draw('page');    
        }
        
        $('#videos_datatable tbody tr').each(function () {
            //increment video index variable by 1
            //for each iteration
            video_index++;
            
            thisRow = $(this);
            //get the JSON data from each video table row
            rowData = videos_datatable.row(thisRow).data();
            
            //invoke the function for
            //assembling eachs slider for
            //the karaoke-slider-1 element
            karaoke_slider_1_item = assembleKaraokeSlider1Item(rowData, video_index);
            
            //populate the karaoke-slider-1
            //with the newly-formed item
            $('#karaoke-slider-1').append(karaoke_slider_1_item);
        });
        
        /*
        * START
        * reload the bxslider
        * with reference to the
        * 'black' value of the
        * registered helper var
        */
        if (registered === 'black') {
            //reload the karaoke_slider_1 bxslider
            karaoke_slider_1.reloadSlider({
                auto: true,
                pager: false,
                infiniteLoop: false,
                hideControlOnEnd: true,
                pause: 6000,
                onSliderLoad: function (currentIndex) {
                    //by default, hide the
                    //div which will contain
                    //the iframe YouTube embed 
                    //for each slide
                    $('.karaoke-slider-1-slide-player-container').hide();

                    //invoke the function
                    //for replacing offline videos
                    //with a notification
                    addOfflineNotifKarSlider1();

                    //invoke functions on every
                    //click of an img in the
                    //videos table
                    $('#videos_datatable tbody tr td img').click(function () {
                        //get the video_index of the tr
                        var thisVideoIndex = $(this).parents('tr').data('index_position');

                        //if the parent tr of this image
                        //does not have an 'active' class
                        if ($(this).parents('tr').not('.active')) {
                            //remove the class 'active'
                            //from all videos table tr items
                            $('#videos_datatable tbody').find('tr.active').removeClass('active');
                            //then add an 'active' class to
                            //this image's parent tr
                            $(this).parents('tr').addClass('active');
                        }

                        //make the karaoke-slider-1 element
                        //scroll to the video frame
                        //corresponding to the videos_datatable img
                        //clicked on
                        karaoke_slider_1.goToSlide(thisVideoIndex);

                        //animate the document
                        //to scroll to the
                        //karaoke-slider-1 element
                        scrollToVidFrame();        
                    });

                    //invoke the function
                    //for replacing a slider content
                    //with an iframe player
                    karSlider1PlayBtnAxn();

                    //hide 'karaokedesclist' ul
                    $('#karaokedesclist').hide();

                    //invoke function for
                    //behaviour of 'karaokedesclist' items
                    showOrHideDescListItems(currentIndex);

                    //invoke function called by
                    //'Show Info' and 'Hide Info' buttons
                    showOrHideKarDescList();
                },
                onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                    //invoke the function
                    //for adding an 'active' class
                    //to the karaoke-slider-2 item
                    //in sync with the karaoke-slider-1 item
                    //that is currently displayed
                    addActiveClass('karaoke-slider-1', newIndex);

                    //invoke the function
                    //for moving the karaoke-slider-2 items
                    //to sync with karaoke-slider-1
                    afterTransitionKarSlider2ItmBehaviour($slideElement, oldIndex, newIndex);

                    //hide 'karaokedesclist' ul
                    $('#karaokedesclist').hide();
                    if ($('#info-buttons ul li#hideinfo').is(':visible')) {
                        $('#info-buttons ul li#hideinfo').hide();
                        $('#info-buttons ul li#showinfo').show();    
                    }

                    //then restart slider autoplay
                    karaoke_slider_1.startAuto();

                    //invoke the function
                    //for removing
                    //the YouTube iframe
                    //and returning the slide controls
                    afterTransitionKarSlider1IframeBehaviour();

                    //invoke function for
                    //behaviour of 'karaokedesclist' items
                    showOrHideDescListItems(newIndex);

                    //invoke function called by
                    //'Show Info' and 'Hide Info' buttons
                    showOrHideKarDescList();

                    //if the element is the last
                    if ($slideElement.data('index_position') === videos_table_items_length) {
                        //first, clear the timeout with ID tablePageTurn
                        window.clearTimeout(tablePageTurn);

                        //set a the tablePageTurn var
                        //into a setTimeout ID
                        //that executes a table page turn
                        //after 8 seconds
                        tablePageTurn = window.setTimeout(goToNextTablePage, 8000);
                    }
                }
            });    
        }
        /*
        * reload the bxslider
        * with reference to the
        * 'black' value of the
        * registered helper var
        * END
        */
        
        /*
        * START
        * reload the bxslider
        * with reference to the
        * 'green' value of the
        * registered helper var
        */
        else if (registered === 'green') {
            //reload the karaoke_slider_1 bxslider
            karaoke_slider_1.reloadSlider({
                auto: false,
                pager: false,
                infiniteLoop: false,
                hideControlOnEnd: true,
                onSliderLoad: function (currentIndex) {
                    //by default, hide the
                    //div which will contain
                    //the iframe YouTube embed 
                    //for each slide
                    $('.karaoke-slider-1-slide-player-container').hide();

                    //invoke the function
                    //for replacing offline videos
                    //with a notification
                    addOfflineNotifKarSlider1();

                    //invoke functions on every
                    //click of an img in the
                    //videos table
                    $('#videos_datatable tbody tr td img').click(function () {
                        //get the video_index of the tr
                        var thisVideoIndex = $(this).parents('tr').data('index_position');

                        //if the parent tr of this image
                        //does not have an 'active' class
                        if ($(this).parents('tr').not('.active')) {
                            //remove the class 'active'
                            //from all videos table tr items
                            $('#videos_datatable tbody').find('tr.active').removeClass('active');
                            //then add an 'active' class to
                            //this image's parent tr
                            $(this).parents('tr').addClass('active');
                        }

                        //make the karaoke-slider-1 element
                        //scroll to the video frame
                        //corresponding to the videos_datatable img
                        //clicked on
                        karaoke_slider_1.goToSlide(thisVideoIndex);

                        //animate the document
                        //to scroll to the
                        //karaoke-slider-1 element
                        scrollToVidFrame();        
                    });

                    //invoke the function
                    //for replacing a slider content
                    //with an iframe player
                    karSlider1PlayBtnAxn();

                    //hide 'karaokedesclist' ul
                    $('#karaokedesclist').hide();

                    //invoke function for
                    //behaviour of 'karaokedesclist' items
                    showOrHideDescListItems(currentIndex);

                    //invoke function called by
                    //'Show Info' and 'Hide Info' buttons
                    showOrHideKarDescList();
                },
                onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                    //invoke the function
                    //for adding an 'active' class
                    //to the karaoke-slider-2 item
                    //in sync with the karaoke-slider-1 item
                    //that is currently displayed
                    addActiveClass('karaoke-slider-1', newIndex);

                    //invoke the function
                    //for moving the karaoke-slider-2 items
                    //to sync with karaoke-slider-1
                    afterTransitionKarSlider2ItmBehaviour($slideElement, oldIndex, newIndex);

                    //hide 'karaokedesclist' ul
                    $('#karaokedesclist').hide();
                    if ($('#info-buttons ul li#hideinfo').is(':visible')) {
                        $('#info-buttons ul li#hideinfo').hide();
                        $('#info-buttons ul li#showinfo').show();    
                    }

                    //invoke the function
                    //for removing
                    //the YouTube iframe
                    //and returning the slide controls
                    afterTransitionKarSlider1IframeBehaviour();

                    //invoke function for
                    //behaviour of 'karaokedesclist' items
                    showOrHideDescListItems(newIndex);

                    //invoke function called by
                    //'Show Info' and 'Hide Info' buttons
                    showOrHideKarDescList();
                }
            }); 
        }
        /*
        * reload the bxslider
        * with reference to the
        * 'green' value of the
        * registered helper var
        * END
        */
    }
    /*
    * function for appending li items to 
    * the karaoke-slider-1 element
    * if the videos datatable
    * has valid items
    * END
    */
    
    /*
    * START
    * function for showing
    * or hiding
    * the karaokedesclist ul li element
    * depending on the karaoke-slider-1 element
    * visible/active on the screen
    */
    function showOrHideDescListItems(index) {
        //hide all the karaoke description list items
        $('#karaokedesclist li').hide();
        //only show the list item that
        //is a match to the
        //item displayed in the
        //karaoke-slider-1 element
        $('#karaokedesclist li').eq(index).show();
    }
    /*
    * function for showing
    * or hiding
    * the karaokedesclist ul li element
    * depending on the karaoke-slider-1 element
    * visible/active on the screen
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
            
            if (registered === 'black') {
                //stop the karaoke-slider-1 autoplay
                karaoke_slider_1.stopAuto();    
            }
        }); 
        
        $('#hideinfo').click(function () {
            //hide the karaokedesclist element
            //(which is the default)
            //BUT don't resume the karaoke-slider-1 autoplay
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
* functions and vars
* for karaoke-slider-1
* END
*/
    
    
    
/*
* START
* functions and vars
* for karaoke-slider-2
*/
    /*
    * START
    * 'clear out' function for
    * the karaoke-slider-2 element
    * if the videos datatable
    * returns no items
    * (i.e., Null search results)
    */
    function renderKaraoke2SliderErrorState(karaoke_slider_2_vis_items) {
        //empty the karaoke-slider-2 element
        //on every draw of the videos dataTable
        while ($('#karaoke-slider-2 li').length > 0) {
            $('#karaoke-slider-2').empty();
        }
        
        $('.bxslider-custom-page-turn').hide();
        
        //empty the
        //utility variable
        //'karaoke_slider_2_vis_items'
        karaoke_slider_2_vis_items.length = 0;
        
        //reload the karaoke-slider-2 element
        //with empty options
        karaoke_slider_2.reloadSlider({
            hideControlOnEnd: false    
        });
    }
    /*
    * END
    * 'clear out' function for
    * the karaoke-slider-2 element
    * if the videos datatable
    * returns no items
    * (i.e., Null search results)
    */
    
    /*
    * START
    * function for assembling
    * a karaoke-slider-2 li item
    * for appending to
    * an error-free karaoke-slider-2
    */
    function assembleKaraokeSlider2Item(rowData, index_data) {
        //form a value
        //to be assigned to
        //the 'alt' attribute of
        //each item img
        var songtitle = rowData[0],
        altsongtitlesplit = rowData[0].split(' '),
        altsongtitle = altsongtitlesplit.join('-');
        
        //add this data to each karaoke-slider-2 li
        //rowData[3] contains the video ID from YouTube
        var karaoke_slider_2_li_item = '<li data-index_position="' + index_data + '" data-video_id="' + rowData[3] + '">';
        karaoke_slider_2_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" width="80%" alt="' + altsongtitle + '-karaoke-video-thumbnail" title="' + songtitle + '">';
        karaoke_slider_2_li_item += '<h6>';
        //rowData[0] contains the song title
        karaoke_slider_2_li_item += rowData[0];
        karaoke_slider_2_li_item += '</h6>';
        karaoke_slider_2_li_item += '<p>';
        //rowData[2] contains the song performer
        karaoke_slider_2_li_item += rowData[2];
        karaoke_slider_2_li_item += '</p>';
        karaoke_slider_2_li_item += '</li>';
        
        return karaoke_slider_2_li_item;  
    }
    /*
    * END
    * function for assembling
    * a karaoke-slider-2 li item
    * for appending to
    * an error-free karaoke-slider-2
    */
    
    /* 
    * START
    * helper function for
    * adding notifications to
    * the karaoke-slider-2 items
    * where the image is not online
    * at YouTube
    */
    function addOfflineNotifKarSlider2() {
        //iterate through each of the newly-formed
        //karaoke-slider-2 li items
        $('#karaoke-slider-2 li img').each(function () {
            //get the src of the img
            var url = $(this).attr('src');
            var thisImage = $(this);
            //assign an empty variable
            //to represent a yet to be determined size
            var size;
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
                    thisImage.replaceWith('<div class="offline-notification">Sorry, video is unavailable</div>')
                }

            });
        });    
    }
    /* 
    * helper function for
    * adding notifications to
    * the karaoke-slider-2 items
    * where the image is not online
    * at YouTube
    * END
    */
    
    /*
    * START
    * function for syncing
    * the karaoke-slider-1 element
    * to the karaoke-slider-2 element
    * when a karaoke-slider-2 item is clicked
    */
    function karaokeSlider2ClickAction() {
        $('#karaoke-slider-2 li').click(function () {
            //assign a var
            //to represent the
            //index position
            //of the element
            var karSlidr1Pos = $(this).data('index_position') - 1;
            
            //if this element
            //DOES NOT have a class of 'active'
            if ($(this).not('.active')) {
                //first find and remove the class 'active'
                //from any karaoke-slider-2 li items
                $('#karaoke-slider-2').find('li.active').removeClass('active');
                //then add the active class
                //to this li item
                $(this).addClass('active');
            }
            
            //make the karaoke-slider-1 element
            //slide/transition to the item
            //with the index position above
            karaoke_slider_1.goToSlide(karSlidr1Pos);
            
            //invoke the function
            //for scrolling to
            //the karaoke-slider-1 element
            scrollToVidFrame();
        });   
    }
    /*
    * function for syncing
    * the karaoke-slider-1 element
    * to the karaoke-slider-2 element
    * when a karaoke-slider-2 item is clicked
    * END
    */
    
    /*
    * START
    * behaviour of
    * each karaoke-slider-2 item element
    * when karaoke-slider-1 undergoes
    * transitions
    */
    function afterTransitionKarSlider2ItmBehaviour($slideElement, oldIndex, newIndex) {
        //make the karaoke-slider-2 element
        //slide/transition to the item
        //with the index position provided
        karaoke_slider_2.goToSlide(newIndex);    
    }
    /*
    * behaviour of
    * each karaoke-slider-2 item element
    * when karaoke-slider-1 undergoes
    * transitions
    * END
    */

    /*
    * START
    * function for populating
    * an error-free karaoke-slider-2
    */
    function initKaraokeSlider2(thisRow, rowData, video_index, karaoke_slider_2_item, karaoke_slider_2_vis_items, videos_table_items_length) { 
        //empty the karaoke-slider-2 element
        //on every draw of the videos dataTable
        while ($('#karaoke-slider-2 li').length > 0) {
            $('#karaoke-slider-2').empty();
        }
        
        //iterate through each table row
        $('#videos_datatable tbody tr').each(function () {
            //increment video index variable by 1
            //for each iteration
            video_index++;
            
            thisRow = $(this);
            //get the JSON data from each video table row
            rowData = videos_datatable.row(thisRow).data();
            
            //per iteration,
            //form a karaoke-slider-2 item
            karaoke_slider_2_item = assembleKaraokeSlider2Item(rowData, video_index);
            
            //insert the karaoke-slider-2 item
            //into the karaoke-slider-2 element
            $('#karaoke-slider-2').append(karaoke_slider_2_item);            
        });
        
        //reload the karaoke-slider-2 bxslider
        karaoke_slider_2.reloadSlider({
            minSlides: 2,
            maxSlides: 10,
            slideWidth: 200,
            moveSlides: 1,
            pager: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            onSliderLoad: function () {
                //invoke the function
                //for replacing offline videos
                //with a notification
                addOfflineNotifKarSlider2();
                
                //invoke function for
                //syncing the karaoke-slider-1 element
                //with the position of the karaoke-slider-2-element
                //on clicking a karaoke-slider-2 item
                karaokeSlider2ClickAction();
                
                //empty the array
                //'karaoke_slider_2_vis_items'
                karaoke_slider_2_vis_items.length = 0;
                
                //get slide count of karaoke-slider-1
                var karaoke_slider_1_qty = karaoke_slider_1.getSlideCount();
                //console.log('The karaoke-slider-1 slider has ' + karaoke_slider_1_qty + ' slides!');
                
                addActiveClass('karaoke-slider-2');
                
                //iterate through each karaoke-slider-2 item
                //that has an attribute of
                //'aria-hidden="false"'
                $('#karaoke-slider-2 li[aria-hidden="false"]').each(function () {
                    //assign a variable
                    //corresponding to the 'index_position' data
                    //of the li item
                    var thisVisibleItemIndex = $(this).data('index_position');
                    //add this data to
                    //the 'karaoke_slider_2_vis_items' array
                    karaoke_slider_2_vis_items.push(thisVisibleItemIndex);
                });
                
                //iterate through all the items of
                //the 'karaoke_slider_2_vis_items array
                for (i = 0; i < karaoke_slider_2_vis_items.length; i++) {
                    //if any one of the items is exactly equal to 1
                    if (karaoke_slider_2_vis_items[i] === 1) {
                        //hide the custom page turn buttons first
                        $('.bxslider-custom-page-turn').hide();
                        //then show the prev button
                        $('#prev-slider-page').show();    
                    }
                } 
            },
            onSlideAfter: function () {
                //empty the array
                //'karaoke_slider_2_vis_items'
                karaoke_slider_2_vis_items.length = 0;
                
                //hide the custom page turn buttons first
                $('.bxslider-custom-page-turn').hide();
                
                //iterate through each karaoke-slider-2 item
                //that has an attribute of
                //'aria-hidden="false"'
                $('#karaoke-slider-2 li[aria-hidden="false"]').each(function () {
                    //assign a variable
                    //corresponding to the 'index_position' data
                    //of the li item
                    var thisVisibleItemIndex = $(this).data('index_position');
                    //add this data to
                    //the 'karaoke_slider_2_vis_items' array
                    karaoke_slider_2_vis_items.push(thisVisibleItemIndex);
                });
                
                //iterate through all the items of
                //the 'karaoke_slider_2_vis_items array
                for (i = 0; i < karaoke_slider_2_vis_items.length; i++) {
                    //if any one of the items is exactly equal to 1
                    if (karaoke_slider_2_vis_items[0] === 1) {
                        //show the prev button
                        $('#prev-slider-page').show();
                    }
                    //if there are no items exactly equal to 1
                    if (karaoke_slider_2_vis_items[0] !== 1) {
                        //hide the custom page turn buttons
                        $('.bxslider-custom-page-turn').hide();
                    }
                    //if any one of the items is exactly equal to
                    //the number of displayed table rows
                    if (karaoke_slider_2_vis_items[i] === videos_table_items_length) {
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
    * an error-free karaoke-slider-2
    */
    
    /*
    * START
    * function that controls
    * the behaviour of the
    * 'Prev Page' and 'Next Page' buttons
    * after the karaoke-slider-2 element
    * has been initialized
    */
    function showOrHideCustomPageBtns(currentTablePage, tablePageTotal) {
        //based on the currentTablePage data above
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
    * after the karaoke-slider-2 element
    * has been initialized
    * END
    */
        
    
    
    
/*
* functions and vars
* for karaoke-slider-2
* END
*/
    

    
    
    
/* START
* behaviour of
* sliders per every
* draw of the videos dataTable
*/
    videos_datatable.on('draw.dt', function () {
        //assign an empty variable
        //to represent each videos table row
        var thisRow,
        //assign an empty variable
        //to represent videos table row data
            rowData,
        //pre-assign a "0" value
        //to a "video index" variable
        //which will increment per
        //iteration later
            video_index = 0,
        //empty variables
        //to represent
        //each individual slider item
        //for both karaoke-slider-1
        //and karaoke-slider-2
            karaoke_slider_1_item,
            karaoke_slider_2_item,
        //helper vars representing
        //integer data about
        //the video table's paging
            tablePageInfo = videos_datatable.page.info(),
            tablePageTotal = tablePageInfo.pages,
            currentTablePage = videos_datatable.page(),
        //assign an empty array to represent
        //the visible items in the
        //karaoke-slider-2 element
        //to be populated while
        //the slider moves
            karaoke_slider_2_vis_items = [],
        //get the length of the videos table
            videos_table_items_length = $('#videos_datatable tbody tr').length,
        //create an empty var
        //which will be assigned
        //the value of a setTimeout ID
        //later in the init karaoke-slider-1 func
            tablePageTurn;
        
        
        
        //if a video table search DOES NOT return a
        //"No Results Found" message
        //(there were results)
        if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) {
            //assemble the karaoke-slider-1 element
            initKaraokeSlider1(registered, thisRow, rowData, video_index, karaoke_slider_1_item, videos_table_items_length, currentTablePage, tablePageTurn);
            
            //assemble the karaoke-slider-2 element
            initKaraokeSlider2(thisRow, rowData, video_index, karaoke_slider_2_item, karaoke_slider_2_vis_items, videos_table_items_length);
            
            //invoke function for
            //showing or hiding the
            //'Prev Page' and 'Next Page' buttons
            //depending on the video table page
            showOrHideCustomPageBtns(currentTablePage, tablePageTotal);
        }
        //if a video table search returns a
        //"No Results Found" message
        //(there were no results)
        else if ($('#videos_datatable tbody tr td.dataTables_empty').length > 0) {
            //invoke the karaoke-slider-1
            //error action
            renderKaraoke1SliderErrorState();
 
            //invoke the karaoke-slider-2
            //error action
            renderKaraoke2SliderErrorState(karaoke_slider_2_vis_items);
        }
    });
/*
* behaviour of
* sliders per every
* draw of the videos dataTable
* END
*/
    
});