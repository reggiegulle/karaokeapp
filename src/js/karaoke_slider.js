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
    
    /* 
    * START
    * helper function for
    * adding notifications to
    * the slick sliders
    * where the image is not online
    * at YouTube
    */
    
    var vidOfflineNotif = '<div class="offline-notification">Sorry, video is unavailable</div>';
    
	function addSliderItemOfflineNotif(video_id, imgObj) {
        var url = 'https://i3.ytimg.com/vi/' + video_id + '/mqdefault.jpg';

        $("<img/>").attr("src", url).load(function () {

            var s = {w: this.width, h: this.height};

            if (s.w === 120) {
                imgObj
                .find('img')
                .replaceWith(vidOfflineNotif);   
            }
        });
	}
    /* 
    * END
    * helper function for
    * adding notifications to
    * the slick sliders
    * where the image is not online
    * at YouTube
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
    * function for appending li items to 
    * the karaoke-slider-1 element
    * if the videos datatable
    * has valid items
    */
    function populateKaraokeSlider1() {
        //remove items from upper bxslider ("karaoke-slider-1")
        //right after each rendering of the videos datatable
        while($('#karaoke-slider-1 li').length > 0){
            $('#karaoke-slider-1').empty();
        }
        
        //reload the karaoke_slider_1 bxslider
        karaoke_slider_1.reloadSlider();
    }
    /*
    * END
    * function for appending li items to 
    * the karaoke-slider-1 element
    * if the videos datatable
    * has valid items
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
    * helper function for
    * adding notifications to
    * the karaoke-slider-2 items
    * where the image is not online
    * at YouTube
    */
    function addOfflineNotifKarSlider2() {
         $('#karaoke-slider-2 li img').each(function () {
            var url = $(this).attr('src');
            var thisImage = $(this);
            var size;
            $('<img/>').attr('src', url).load(function () {
                size = {width: this.width, height: this.height};
                if (size.width < 320) {
                    //console.log(thisImage);
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
        //add this data to each hotel-2 li
        var karaoke_slider_2_li_item = '<li data-index_position="' + index_data + '" data-video_id="' + rowData[3] + '">';
        karaoke_slider_2_li_item += '<div class="hotel-2-slide">';
        karaoke_slider_2_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" width="80%" alt="' + rowData[0] + '"></div>';
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
            
            karaoke_slider_2_item = assembleKaraokeSlider2Item(rowData, video_index);
            
            $('#karaoke-slider-2').append(karaoke_slider_2_item);            
        });
        
        //reload the karaoke-slider-2 bxslider
        karaoke_slider_2.reloadSlider({
            minSlides: 2,
            maxSlides: 10,
            slideWidth: 200,
            onSliderLoad: function () {
                addOfflineNotifKarSlider2();
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
            karaoke_slider_2_item;

        //if a video table search DOES NOT return a
        //"No Results Found" message
        //(there were results)
        if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) {
            initKaraokeSlider2(thisRow, rowData, video_index, karaoke_slider_2_item);
        }
        else if ($('#videos_datatable tbody tr td.dataTables_empty').length > 0) {
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