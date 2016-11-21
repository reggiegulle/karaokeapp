$(document).ready(function() {
    
/**
* START
* functions and behaviours
* assigned to the videos table element
* with the DataTables jQuery plug-in
*/
    
    //helper vars
    var vidOfflineNotif = '<div class="offline-notification"><img src="images/no-video-black-with-text-320x180.jpg" width="160px" height="90px" alt="No-video-available" title="Video is unavailable"></div>',
    /*
    * START
    * content and vars of 
    * the 'custom_sort_and_filter_section'
    */
        search_icon = '<img src="images/search_icon.png" width="32px" height="32px" alt="search icon" id="search-icon" />',
        search_reset_button = '<button id="search_reset" class="filter-reset-button">X</button>',
        sort_video_field_val = 'reset',
        order_column = 1,
        order_type = 'desc',
    /*
    * END
    * content and vars of 
    * the 'custom_sort_and_filter_section'
    */
    /*
    * START
    * utility variables
    * to be assigned as
    * values of data
    * to be sent over
    * the video datatable
    * AJAX request
    */
        filter_yr_of_rlse = 'reset',
        filter_genre = 'reset',
        filter_country_origin = 'reset',
        genre_filter_value = 'reset',
        country_filter_value = 'reset';
    /*
    * END
    * utility variables
    * to be assigned as
    * values of data
    * to be sent over
    * the video datatable
    * AJAX request
    */
    /*
    * START
    * content of the 'custom_sort_and_filter_section'
    */
	var custom_sort_and_filter_section = '';
        custom_sort_and_filter_section += '<div class="navbar-header">';
        custom_sort_and_filter_section += '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">';
        custom_sort_and_filter_section += '<span class="icon-bar"></span>';
        custom_sort_and_filter_section += '<span class="icon-bar"></span>';
        custom_sort_and_filter_section += '<span class="icon-bar"></span>';
        custom_sort_and_filter_section += '</button>';
        custom_sort_and_filter_section += '<div class="navbar-brand">Sort Or Filter</div>';
        custom_sort_and_filter_section += '</div>';
        custom_sort_and_filter_section += '<div class="collapse navbar-collapse" id="bs-navbar-collapse-1">';
        custom_sort_and_filter_section += '<ul id="custom-sort-and-filter" class="nav navbar-nav col-xs-12">'
        custom_sort_and_filter_section += '<li class="sort col-xs-12">';
        custom_sort_and_filter_section += '<select id="fields-for-sorting-videos">';
        custom_sort_and_filter_section += '<option value="1" selected="selected">-- Sort Videos By --</option>';
        custom_sort_and_filter_section += '<option value="0">Title</option>';
        custom_sort_and_filter_section += '<option value="2">Performer</option>';
        custom_sort_and_filter_section += '<option value="6">Album</option>';
        custom_sort_and_filter_section += '<option value="7">Year</option>';
        custom_sort_and_filter_section += '<option value="5">Genre</option>';
        custom_sort_and_filter_section += '<option value="8">Country</option>';
        custom_sort_and_filter_section += '</select>';
        custom_sort_and_filter_section += '<select id="order-for-text-sorting-videos">';
        custom_sort_and_filter_section += '<option value="asc" selected="selected">A - Z</option>';
        custom_sort_and_filter_section += '<option value="desc">Z - A</option>';
        custom_sort_and_filter_section += '</select>';
        custom_sort_and_filter_section += '<select id="order-for-num-sorting-videos">';
        custom_sort_and_filter_section += '<option value="asc" selected="selected">Old - New</option>';
        custom_sort_and_filter_section += '<option value="desc">New - Old</option>';
        custom_sort_and_filter_section += '</select>';
        custom_sort_and_filter_section += '<button id="reset-videos-sorting" class="filter-reset-button">X</button>';
        custom_sort_and_filter_section += '</li>';
        custom_sort_and_filter_section += '<li class="filter col-xs-12 col-sm-4 col-md-4">';
        custom_sort_and_filter_section += '<select id="decade-filter">';
        custom_sort_and_filter_section += '<option value="reset" selected="selected">-- Filter By Decade --</option>';
        custom_sort_and_filter_section += '<option value="2010">2010s</option>';
        custom_sort_and_filter_section += '<option value="2000">2000s</option>';
        custom_sort_and_filter_section += '<option value="1990">1990s</option>';
        custom_sort_and_filter_section += '<option value="1980">1980s</option>';
        custom_sort_and_filter_section += '<option value="1970">1970s</option>';
        custom_sort_and_filter_section += '<option value="1960">1960s</option>';
        custom_sort_and_filter_section += '<option value="1950">1950s</option>';
        custom_sort_and_filter_section += '<option value="1940">1940s</option>';
        custom_sort_and_filter_section += '</select>';
        custom_sort_and_filter_section += '<button id="reset-decade-filter" class="filter-reset-button">X</button>';
        custom_sort_and_filter_section += '</li>';
        custom_sort_and_filter_section += '<li class="filter col-xs-12 col-sm-4 col-md-4">';
        custom_sort_and_filter_section += '<select id="genre-filter">';
        custom_sort_and_filter_section += '</select>';
        custom_sort_and_filter_section += '<button id="reset-genre-filter" class="filter-reset-button">X</button>';
        custom_sort_and_filter_section += '</li>';
        custom_sort_and_filter_section += '<li class="filter col-xs-12 col-sm-4 col-md-4">';
        custom_sort_and_filter_section += '<select id="country-filter">';
        custom_sort_and_filter_section += '</select>';
        custom_sort_and_filter_section += '<button id="reset-country-filter" class="filter-reset-button">X</button>';
        custom_sort_and_filter_section += '</li>';  
        custom_sort_and_filter_section += '</ul>';
        custom_sort_and_filter_section += '</div>';
    /*
    * END
    * content of the 'custom_sort_and_filter_section'
    */
    
    /* 
    * START
    * helper functions for
    * adding notifications to the videos datatable
    * where the image is not online
    * at YouTube
    */
	function addOfflineNotif(elemId, srcData, htmlObj) {
        //if the function
        //is called by a videos dataTable element
        if (elemId === 'videos_datatable') {
            //form a URL of the image
            var url = 'https://i3.ytimg.com/vi/' + srcData[3] + '/mqdefault.jpg';
            
            //load the image through a jQuery img object
            $("<img/>").attr("src", url).load(function () {
                //get the dimensions
                var s = {w: this.width, h: this.height};
                //if the width of the src img
                //is exactly equal to 120px
                if (s.w === 120) {
                    $(htmlObj)
                        .children('td')
                        .eq(3)
                        .html(vidOfflineNotif);
                }
            });	    
        }
        //else if the function
        //is called by a karaokedesclist child element
        else if (elemId === 'karaokedesclist') {
            //URL of the image supplied by the function argument 'srcData'
            var url = srcData;
            
            //load the image through a jQuery img object
            $("<img/>").attr("src", url).load(function () {
                //get the dimensions
                var s = {w: this.width, h: this.height};
                //if the width of the src img
                //is exactly equal to 120px
                if (s.w === 120) {
                    $(htmlObj)
                        //replace the img tag with
                        //a 'Video Not Available' notification
                        .children('img')
                        .replaceWith(vidOfflineNotif);
                }
            });	    
        }
	}
    /*  
    * END
    * helper functions for
    * adding notifications to the videos datatable
    * where the image is not online
    * at YouTube
    */
    
    /**
    * This plug-in removes the default behaviour of DataTables to filter on each
    * keypress, and replaces with it the requirement to press the enter key to
    * perform the filter.
    *
    *  @name fnFilterOnReturn
    *  @summary Require the return key to be pressed to filter a table
    *  @author [Jon Ranes](http://www.mvccms.com/)
    *
    *  @returns {jQuery} jQuery instance
    *
    *  @example
    *    $(document).ready(function() {
    *        $('.dataTable').dataTable().fnFilterOnReturn();
    *    } );
    */

    jQuery.fn.dataTableExt.oApi.fnFilterOnReturn = function (oSettings) {
        var _that = this;

        this.each(function (i) {
            $.fn.dataTableExt.iApiIndex = i;
            var $this = this;
            var anControl = $('input', _that.fnSettings().aanFeatures.f);
            anControl
                .unbind('keyup search input')
                .bind('keypress', function (e) {
                    if (e.which === 13) {
                        $.fn.dataTableExt.iApiIndex = i;
                        _that.fnFilter(anControl.val());
                    }
                });
            return this;
        });
        return this;
    };
	
	/**
    * initialize the dataTable
    * for the karaoke videos
    * in the layout for a registered user
    */
    $("#videos_datatable").dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            'url': 'ajax/table_processing.php',
            'data': function (data) {
                data.year_of_release = filter_yr_of_rlse;
                data.genre = filter_genre;
                data.country_of_origin = filter_country_origin;
                data.registered = registered;
            }
        },
        "dom": "f<\"col-xs-12 navbar navbar-default container-fluid\" <\"custom-sort-and-filter-container row\">><\"col-xs-12\"i><\"col-sm-8 col-xs-12\"l><\"col-sm-4 col-xs-12\"p><t><\"col-sm-4 col-xs-12\"i><\"col-sm-8 col-xs-12\"p><\"col-xs-12\"l>r",
        "responsive" : true,
        "columnDefs": [
            {"orderable": false, "targets": [3, 10]},
            {"className": "never", "targets": [1, 11]}, //ID, Added By
            {"className": "none", "targets": [4, 9, 10]}, //Composer, Running Time, Lyrics
            {"className": "all strong", "targets": [0]}, //Song Title 
            {"className": "all", "targets": [3], "createdCell": addRowImages}, //addRowImages is a function for adding img thumbnails to each assigned image-containing table cell
            {"className": "min-tablet", "targets": [2, 6]}, //Performed By, Source Album
            {"className": "min-desktop", "targets": [5, 7, 8]}// Genre, Year of Release, Country of Origin
        ],
        "order": [ 0, 'asc' ],
        "lengthMenu": [ 100, 150 ],
        "stateSave": true,
        "sPaginationType": "listbox",
        "drawCallback": prepareVideosTable
    }).fnFilterOnReturn();
    
    //assign HTML content to the .custom-sort-and-filter-container class
    $('div.custom-sort-and-filter-container').html(custom_sort_and_filter_section);
    
    //make sure that
    //the value of the 'search' input
    //for the videos_datatable
    //is empty when the page is refreshed
    $('#videos_datatable_filter input.form-control.input-sm').val('');
	
    //assign a variable to
    //the videos dataTable API instance
	var videos_datatable = $('#videos_datatable').DataTable();
	
   /*
    * START
    * function for programmatically adding images
    * to the videos dataTable
    * @param cell (int),
    * @param cellData (array data),
    * @param rowData (array),
    * @param row (int),
    * @param col (int)
    */
    function addRowImages(cell, cellData, rowData, row, col) {
        //assign variables for
        //populating certain attributes
        //of the HTML tags to be formed below
        var songtitle = rowData[0],
            altsongtitlesplit = rowData[0].split(' '),
            altsongtitle = altsongtitlesplit.join('-');
        
        //form a new img element
        var newCellHTML = '<img class="table-thumbnail" src="https://i3.ytimg.com/vi/'; 
        newCellHTML += cellData;
        newCellHTML += '/mqdefault.jpg" alt="'; 
        newCellHTML += altsongtitle;
        newCellHTML += '-thumbnail" ';
        newCellHTML += 'height="84px" width="154px" ';
        newCellHTML += 'longdesc="Thumbnail for the Youtube karaoke video of \''; 
        newCellHTML += songtitle + '\'" title="' + songtitle + '"/>'
        newCellHTML += '<div class="video-thumbnail-play-icon-overlay"></div>';
        
        //place the img element into
        //the relevent videos table TD elem
        $(cell).html(newCellHTML);
    }
    /*
    * function for adding images
    * to the videos dataTable
    * END
    */
    
    /*
    * START
    * function for populating
    * the 'karaokedesclist' ul tag
    */
    function populateKaraokedesclist() {
        videos_datatable.on('draw.dt', function () {
            //empty the karaokedesclist ul element
            //with each table render
            while ($('#karaokedesclist li').length > 0) {
                $('#karaokedesclist').empty();    
            }
            
            //if a video table search 
            //or the rendered videos_datatable 
            //DOES NOT return a
            //"No Results Found" message
            //(there were results)
            if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) {
                //assign an empty variable
                //to be incremented later
                var index_position = 0;

                //get data from each videos_datatable row
                //and convert the data into
                //fully-formatted description items
                //enclosed in 'li' tags
                $('#videos_datatable tbody tr').each(function () {
                    //increment the index_position variable
                    index_position++;
                    var thisRow = $(this),
                        //get the raw array data from each row
                        //of the assembled videos data table
                        rowData = videos_datatable.row(thisRow).data(),
                        //assign variables for
                        //populating certain attributes
                        //of the HTML tags to be
                        //dynamically assembled into
                        //a 'li' item
                        songtitle = rowData[0], //raw string data
                        altsongtitlesplit = rowData[0].split(' '),
                        altsongtitle = altsongtitlesplit.join('-');
                    
                    //form a new 'karaokedesclist' li child element
                    //with content assembled as below
                    var karaokedesclistitem = '<li data-index_position="';
                        karaokedesclistitem += index_position - 1;
                        karaokedesclistitem += '">';
                        //rowData[3] is the Video ID string data
                        karaokedesclistitem += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" alt="' + altsongtitle + '-thumbnail" width="160px" height="90px" longdesc="Thumbnail for the Youtube karaoke video of \'' + songtitle + '\'" />';
                        //rowData[0] is the Song Title string data  
                        karaokedesclistitem += '<h4>' + rowData[0] + '</h4>';
                        //rowData[4] is the Composer string data
                        karaokedesclistitem += '<p>(' + rowData[4] + ')</p>';
                        //rowData[2] is the Performer string data
                        karaokedesclistitem += '<h5>As Popularized By: <strong>' + rowData[2] + '</strong></h5>';
                        //rowData[6] is the Source Album string data
                        //rowData[7] is the Year Of Release string data
                        //rowData[8] is the Country Of Origin string data
                        //rowData[10] is the Lyrics long text data
                        karaokedesclistitem += '<p>From The Album: <em>' + rowData[6] + '</em> (' + rowData[7] + ', ' + rowData[8] + ')</p>';
                        karaokedesclistitem += '<p>' + rowData[10] + '</p>';
                        //rowData[9] is the Running Time date/time data
                        karaokedesclistitem += '<p><em>' + rowData[9] + '</em></p>';
                        //rowData[5] is the Genre string data
                        karaokedesclistitem += '<p><em>' + rowData[5] + '</em></p>';
                        //rowData[11] is the Added By string data
                        karaokedesclistitem += '<p>Added By: ' + rowData[11] + '</p>';
                        //close the 'li' tag
                        karaokedesclistitem += '</li>';
                    
                    //append the newly formed li element
                    //into the karaokedesclist ul
                    $('#karaokedesclist').append(karaokedesclistitem);
                });
                
                //go over each karaokedesclist ul li
                //and replace 'offline' YouTube thumbnails
                //with a notification
                $('#karaokedesclist li').each(function () {
                    var thisLiItem = $(this),
                        imgURL = $(this).children('img').attr('src');
                    
                    //invoke the 'addOfflineNotif' function
                    //for adding a 'Video Not Available' notification
                    addOfflineNotif('karaokedesclist', imgURL, thisLiItem);
                }); 
            } else if ($('#videos_datatable tbody tr td.dataTables_empty').length > 0) {
            //if a video table search RETURNS a
            //"No Results Found" message
            //(there were null results)
            
                //form a new li element
                //with class 'desclistempty'
                //to appear as an error notification
                var karaokedesclistitem = '<li class="desclistempty">';
                    karaokedesclistitem += 'Sorry, No Info To Show';
                    karaokedesclistitem += '</li>';
                
                //add the li element 
                //with class 'desclistempty'into
                //the karaokedesclist ul
                //as the sole item
                $('#karaokedesclist').append(karaokedesclistitem);
            }
        });    
    }
    /*
    * function for populating
    * the karaoke description list
    * END
    */
    
    /*
    * START
    * callback function to be invoked
    * every time the videos dataTable
    * is 'drawn' or rendered
    * and if the user registered
    * or an administrative user
    */
    function prepareVideosTable() {
        //assign a variable to
        //the videos dataTable API instance
        var videos_datatable = $('#videos_datatable').DataTable();
        
        //check if a video table search 
        //or the rendered videos_datatable 
        //DOES NOT return a
        //"No Results Found" message
        //(there were results)
        
        //check if the user
        //has sufficient privileges
        if (registered === 'green') {
            if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) { 
                //assign an empty variable
                //to be incremented later
                var index_position = 0;
                
                $('#videos_datatable tbody tr').each(function () {
                    //assign helper vars
                    //for assembling links 
                    //to MySQL C-R-U-D pages
                    //to be added to the each row
                    //of the videos table
                    //if user has sufficient
                    //privileges
                    var thisRow = $(this),
                        //get the raw data array of each videos_datatable row
                        rowData = videos_datatable.row(thisRow).data(),
                        //get the int index id of each row from the MySQL db
                        song_db_id = rowData[1],
                        //get the string 'song_title' data of each row from the MySQL db
                        songtitle = rowData[0],
                        songtitlesplit = rowData[0].split(' '),
                        songtitlejoin = songtitlesplit.join('+'),
                        //get the videos_datatable HTML row first Node object,
                        //which is equivalent to
                        //the first TD of each TR
                        firstNode = videos_datatable.cell(this, 0).node(),
                        //empty variable
                        //to become equivalent to
                        //HTML content to be added later
                        crudLinks;
                    
                    //increment video_index
                    index_position++;
                    //assign a 'data-index_position' attribute
                    //to each of the
                    //#videos_datatable tbody tr tags
                    thisRow.attr('data-index_position', index_position - 1);

                    //assemble the links
                    //to be added to 
                    //the first TD of each TR
                    crudLinks = '<p>' + songtitle + '</p>';
                    crudLinks += '<a href="update_video.php?id=' + song_db_id + '">Edit Video Details</a>';
                    crudLinks += '<a href="delete_video.php?video_id=' + song_db_id + '&song_title=' + songtitlejoin + '" onclick="return confirm(\'Are You Sure?\')"><p>Delete Video</p></a>';

                    //add the links
                    $(firstNode)
                        .html(crudLinks)
                        .css({
                            'background-color': 'white',
                            'box-shadow': 'none'
                        });
                    
                    //if the YouTube video of the row is offline,
                    //invoke the function
                    //for replacing its img thumbnail
                    //with a "No Video Available" notification
                    addOfflineNotif('videos_datatable', rowData, thisRow);
                });    
            }
        }
        
        //remove the default
        //"Search" text of the
        //input search field
        $('#videos_datatable_filter.dataTables_filter label')
            .contents()
            .filter(function () {
                //find the only node item
                //that is of type 'text'
                return this.nodeType === 3; 
            })
            .remove();
        
        //add a custom PNG
        //search icon to
        //the start of
        //the input search field
        if ($('#search-icon').length === 0) {
            $('#videos_datatable_filter.dataTables_filter label').prepend(search_icon);    
        }
        
        //add a custom 
        //'search reset' button
        //right after
        //the input search field
        if ($('#search_reset').length === 0) {
            $('#videos_datatable_filter.dataTables_filter label').append(search_reset_button);    
        }
        
        //behaviour of the
        //'custom-sort fields-for-sorting-videos' select tag
        $('#fields-for-sorting-videos').change(function () {
            
            //grab the value of this option dropdown
            //and assign it as 'order_column'
            order_column = parseInt($(this).val());
            
            //if '-- Sort Videos By --' option
            //is selected,
            //the behaviour should be
            //as if the form is reset
            if (order_column === 1) {
                order_type = 'desc';
                $('#reset-videos-sorting').trigger('click');
            }
            //if the value selected is 'Year',
            //the sorting options
            //should be "Old - New"
            //or "New - Old"
            else if (order_column === 7) {
                $('#order-for-num-sorting-videos').val('asc');
                order_type = 'asc';
                $('#order-for-num-sorting-videos').show();
                if ($('#order-for-text-sorting-videos').is(':visible')) {
                    $('#order-for-text-sorting-videos').hide();    
                }
                videos_datatable.order( [ order_column, order_type ] ).draw();
            }
            //for all other values,
            //the sorting options
            //should be "A - Z"
            //or "Z - A"
            else {
                $('#order-for-text-sorting-videos').val('asc');
                order_type = 'asc';
                $('#order-for-text-sorting-videos').show();
                if ($('#order-for-num-sorting-videos').is(':visible')) {
                    $('#order-for-num-sorting-videos').hide();    
                }
                videos_datatable.order( [ order_column, order_type ] ).draw();
            }
        });
        
        //behaviour of the
        //'custom-sort order-for-text-sorting' and 
        //'custom-sort order-for-num-sorting' select elems
        $('#order-for-text-sorting-videos').change(function() {
            order_type = $(this).val();
            $('#order-for-num-sorting-videos').val('asc');
            videos_datatable.order( [ order_column, order_type ] ).draw();
        });
        
        $('#order-for-num-sorting-videos').change(function() {
            order_type = $(this).val();
            $('#order-for-text-sorting-videos').val('asc');
            videos_datatable.order( [ order_column, order_type ] ).draw();
        });
        
        
        //behaviour of the 'custom-sort' reset button
        $('#reset-videos-sorting').click(function () {
            $('#fields-for-sorting-videos').val('1');
            $('#order-for-text-sorting-videos').val('asc');
            $('#order-for-num-sorting-videos').val('asc');
            if ($('#order-for-text-sorting-videos').is(':visible')) {
                $('#order-for-text-sorting-videos').hide();    
            }
            if ($('#order-for-num-sorting-videos').is(':visible')) {
                $('#order-for-num-sorting-videos').hide();    
            }
            videos_datatable.order( [ 1, 'desc'] ).draw();
        });
        
        //grab the values/options
        //to be inserted into
        //the 'select' tag
        //for the custom filters
        var get_filters = $.ajax({
            url: 'video_filter_values.php',
            dataType: 'json'
        });
        
        //empty the custom filters
        $('#genre-filter').empty();
        $('#country-filter').empty();
        
        //the var get_filters is
        //a Promise Object that
        //fills out the custom filter
        //for the genre
        get_filters.done(function (data) {
            $.each(data.genre, function (index, value) {
                $('#genre-filter').append('<option value="' + value + '">' + value + '</option>');    
            });
            //put reset option
            //at the beginning
            $('#genre-filter').prepend('<option value="reset" selected="selected">-- Filter By Genre --</option>');
            //make sure to
            //assign the proper
            //filter value
            $('#genre-filter').val(genre_filter_value);
        })
        //the var get_filters is
        //a Promise Object that
        //also fills out the custom filter
        //for the country of origin
        .done(function (data) {
            $.each(data.country_of_origin, function (index, value) {
                $('#country-filter').append('<option value="' + value + '">' + value + '</option>');    
            });
            //put reset option
            //at the beginning
            $('#country-filter').prepend('<option value="reset" selected="selected">-- Filter By Country --</option>');
            //make sure to
            //assign the proper
            //filter value
            $('#country-filter').val(country_filter_value);
        });
        
        //make the search reset button
        //functional
        $('#search_reset').on('click', function () {
            $('.form-control.input-sm').val('');
            $('#reset-decade-filter').trigger('click');
            $('#reset-genre-filter').trigger('click');
            $('#reset-country-filter').trigger('click');
            videos_datatable.search('').draw();
        });

        //Custom filters
        $('#decade-filter').change(function () {
            filter_yr_of_rlse = $(this).val();
            videos_datatable.draw();
        });

        $('#genre-filter').change(function () {
            filter_genre = $(this).val();
            genre_filter_value = filter_genre;
            videos_datatable.draw();
        });

        $('#country-filter').change(function () {
            filter_country_origin = $(this).val();
            country_filter_value = filter_country_origin;
            videos_datatable.draw();
        });

        //Reset buttons for custom filters
        $('#reset-decade-filter').click(function () {
            $('#decade-filter').val('reset');
            filter_yr_of_rlse = 'reset';
            videos_datatable.draw();
        });

        $('#reset-genre-filter').click(function () {
            $('#genre-filter').val('reset');
            filter_genre = 'reset';
            genre_filter_value = filter_genre;
            videos_datatable.draw();
        });

        $('#reset-country-filter').click(function () {
            $('#country-filter').val('reset');
            filter_country_origin = 'reset';
            country_filter_value = filter_country_origin;
            videos_datatable.draw();
        });
        
        //set the style
        //of the filter toggle button
        //contents
        $('.navbar-toggle').mouseenter(function () {
            $('.icon-bar').css({
                'background-color': 'rgb(51, 255, 255)'        
            });    
        });
        $('.navbar-toggle').mouseleave(function () {
            $('.icon-bar').css({
                'background-color': 'white'        
            });    
        });
    }
    /*
    * callback function to be invoked
    * every time the videos dataTable
    * is 'drawn' or rendered
    * and if the user registered
    * or an administrative user
    * END
    */
    
    /*
    * START
    * invoke the function
    * for populating the karaokedesclist ul
    */
    populateKaraokedesclist();
    /*
    * invoke the function
    * for populating the karaokedesclist ul
    * END
    */
    
    /*
    * START
    * behaviour of
    * the 'info-buttons' ul
    * li elements
    * in relation to
    * the rendering of the videos datatable
    */
    //by default, only the
    //'SHOW INFO' button must be visible
    $('#info-buttons ul li#hideinfo').hide();
    
    //toggle the visibility of the
    //HIDE INFO and SHOW INFO buttons
    $('#info-buttons ul li').click(function () {
        if ($('#info-buttons ul li#showinfo').is(':visible')) {
            $('#info-buttons ul li#showinfo').hide();
            $('#info-buttons ul li#hideinfo').show();
        }
        else if ($('#info-buttons ul li#hideinfo').is(':visible')) {
            $('#info-buttons ul li#hideinfo').hide();
            $('#info-buttons ul li#showinfo').show();
        }
    });
    /*
    * behaviour of
    * the 'info-buttons' ul
    * li elements
    * in relation to
    * the rendering of the videos datatable
    * END
    */
    
/**
* END
* functions and behaviours
* assigned to the videos table element
* with the DataTables jQuery plug-in
*/
});