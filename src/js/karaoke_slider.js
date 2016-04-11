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
    * excluding list items from
    * the slick sliders
    * where the image is not online
    * at YouTube
    */
	function keepOrRemoveSliderItem(video_id, imgObj) {
        var url = 'https://i3.ytimg.com/vi/' + video_id + '/mqdefault.jpg';

        $("<img/>").attr("src", url).load(function () {

            var s = {w: this.width, h: this.height};

            if (s.w === 120) {
                imgObj.remove();   
            }
        });
	}
    /* 
    * END
    * helper function for
    * excluding list items from
    * the slick sliders
    * where the image is not online
    * at YouTube
    */
    
    /*
    * START
    * function for populating
    * an error-free karaoke-slider-2
    */
    function assembleKaraokeSlider2Item(rowData, index_data) {
        //add this data to each hotel-2 li
        var slider_li_item = '<li data-index_position="' + index_data + '" data-video_id="' + rowData[3] + '">';
        slider_li_item += '<div class="hotel-2-slide">';
        slider_li_item += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" width="80%" alt="' + rowData[0] + '"></div>';
        slider_li_item += '<h6>';
        slider_li_item += rowData[0];
        slider_li_item += '</h6>';
        slider_li_item += '<p>';
        slider_li_item += rowData[2];
        slider_li_item += '</p>';
        slider_li_item += '</li>';
        return slider_li_item;  
    }
    /*
    * END
    * function for populating
    * an error-free karaoke-slider-2
    */
    
    //assign a variable to the
    //karaoke-slider-2 element
    //and initialize it as
    //a new bxslider instance
    var karaoke_slider_2 = $('#karaoke-slider-2').bxSlider();
    
    //assign "hoteltable" dataTable API instance
    var videos_datatable = $('#videos_datatable').DataTable();
    
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
        
        //empty the karaoke-slider-2 element
        //on every draw of the videos dataTable
        while ($('#karaoke-slider-2 li').length > 0) {
            $('#karaoke-slider-2').empty();
        }
        
        //if a video table search DOES NOT return a
        //"No Results Found" message
        //(there were results)
        if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) {
            //iterate through each table row
            $('#videos_datatable tbody tr').each(function () {
                thisRow = $(this);
                //get the JSON data from each video table row
                rowData = videos_datatable.row(thisRow).data();
                //increment video index variable by 1
                //for each iteration
                video_index++;
                //assemble the karaoke-slider-2 li item
                karaoke_slider_2_item = assembleKaraokeSlider2Item(rowData, video_index - 1);
                //append karaoke-slider-2 li item
                //to the #karaoke-slider-2 ul
                $('#karaoke-slider-2').append(karaoke_slider_2_item);
            });
            
            $('#karaoke-slider-2 li').each(function () {
                var thisLiVideoId = $(this).data('video_id');
                var thisLi = $(this);
                keepOrRemoveSliderItem(thisLiVideoId, thisLi);
            });
        }
        
        //reload the karaoke-slider-2 bxslider
        karaoke_slider_2.reloadSlider({
            minSlides: 2,
            maxSlides: 10,
            slideWidth: 200
        });
    });
/* END
* behaviour of
* sliders per every
* draw of the videos dataTable
*/
    
});