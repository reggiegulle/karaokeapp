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
        
        //add this data to each karaoke-slider-1 li
        var karaoke_slider_1_li_item = '<li data-index_position="' + index_data + '" data-video_id="' + rowData[3] + '">';
        karaoke_slider_1_li_item += '<div class="karaoke-slider-1-slide-shell">';
        karaoke_slider_1_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/hqdefault.jpg" width="100%" alt="' + altsongtitle + '-karaoke-video-thumbnail">';
        karaoke_slider_1_li_item += '<button class="play-button">Play</button>';
        karaoke_slider_1_li_item += '<div class="karaoke-splash-details">';
        karaoke_slider_1_li_item += '<h4>' + songtitle + '</h4>';
        karaoke_slider_1_li_item += '<p>' + rowData[2] + '</p>';
        karaoke_slider_1_li_item += '</div>';
        karaoke_slider_1_li_item += '</div>';
        karaoke_slider_1_li_item += '</li>';
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
        //karaoke-slider-2 li items
        $('#karaoke-slider-1 li img').each(function () {
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
    * the karaoke-slider-1 items
    * where the image is not online
    * at YouTube
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
            
            karaoke_slider_1_item = assembleKaraokeSlider1Item(rowData, video_index);
            
            $('#karaoke-slider-1').append(karaoke_slider_1_item);
        });
        
        //reload the karaoke_slider_1 bxslider
        karaoke_slider_1.reloadSlider({
            auto: true,
            autoHover: true,
            pager: false,
            pause: 6000,
            onSliderLoad: function () {
                //invoke the function
                //for replacing offline videos
                //with a notification
                addOfflineNotifKarSlider1();
            },
            onSlideAfter: afterTransitionKarSlider2ItmBehaviour
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
        var karaoke_slider_2_li_item = '<li data-index_position="' + index_data + '" data-video_id="' + rowData[3] + '">';
        karaoke_slider_2_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" width="80%" alt="' + altsongtitle + '-karaoke-video-thumbnail">';
        karaoke_slider_2_li_item += '<h6>';
        karaoke_slider_2_li_item += rowData[0];
        karaoke_slider_2_li_item += '</h6>';
        karaoke_slider_2_li_item += '<p>';
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
            var karSlidr1Pos = $(this).data('index_position') - 1;
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
            initKaraokeSlider2(thisRow, rowData, video_index, karaoke_slider_2_item);
            initKaraokeSlider1(thisRow, rowData, video_index, karaoke_slider_1_item);
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