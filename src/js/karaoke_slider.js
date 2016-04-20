$(document).ready(function () {
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
        karaoke_slider_1_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/hqdefault.jpg" width="100%" alt="' + altsongtitle + '-karaoke-video-thumbnail">';
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
            //pause the autoplay
            //of the karaoke-slider-1 element
            karaoke_slider_1.stopAuto();
            
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
            //restart the autoplaying slideshow
            //process of bxslider
            karaoke_slider_1.startAuto();
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
    function initKaraokeSlider1(thisRow, rowData, video_index, karaoke_slider_1_item) {
        //remove items from upper bxslider ("karaoke-slider-1")
        //right after each rendering of the videos datatable
        while($('#karaoke-slider-1 li').length > 0){
            $('#karaoke-slider-1').empty();
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
        
        //reload the karaoke_slider_1 bxslider
        karaoke_slider_1.reloadSlider({
            auto: true,
            pager: false,
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
            }
        });
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
            //stop the karaoke-slider-1 autoplay
            karaoke_slider_1.stopAuto();
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
    function renderKaraoke2SliderErrorState() {
        //empty the karaoke-slider-2 element
        //on every draw of the videos dataTable
        while ($('#karaoke-slider-2 li').length > 0) {
            $('#karaoke-slider-2').empty();
        }
        
        //reload the karaoke-slider-2 element
        //with empty options
        karaoke_slider_2.reloadSlider();
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
        karaoke_slider_2_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" width="80%" alt="' + altsongtitle + '-karaoke-video-thumbnail">';
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
            
            //make the karaoke-slider-1 element
            //slide/transition to the item
            //with the index position above
            karaoke_slider_1.goToSlide(karSlidr1Pos);
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
    function initKaraokeSlider2(thisRow, rowData, video_index, karaoke_slider_2_item) { 
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
            }
        });
    }
    /*
    * END
    * function for populating
    * an error-free karaoke-slider-2
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
            karaoke_slider_1_item,
            karaoke_slider_2_item;
        
        

        //if a video table search DOES NOT return a
        //"No Results Found" message
        //(there were results)
        if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) {
            //assemble the karaoke-slider-1 element
            initKaraokeSlider1(thisRow, rowData, video_index, karaoke_slider_1_item);
            
            //assemble the karaoke-slider-2 element
            initKaraokeSlider2(thisRow, rowData, video_index, karaoke_slider_2_item);
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
            renderKaraoke2SliderErrorState();
        }
    });
/*
* behaviour of
* sliders per every
* draw of the videos dataTable
* END
*/
    
});