$(document).ready(function () {
/**
* START
* functions and behaviours
* assigned to the videos table element
* with the DataTables jQuery plug-in
*/
    
    //helper vars
    var vidOfflineNotif = '<div class="offline-notification">Sorry, video is unavailable</div>',
    /*
    * START
    * content of the 'custom_filter_section'
    */
        search_icon = '<img src="images/search_icon.png" width="32px" height="32px" alt="search icon" id="search-icon" />',
    /*
    * END
    * content of the 'custom_filter_section'
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
    * content of the 'custom_filter_section'
    */
	var custom_filter_section = '<section id="custom-filter-container" class="container-fluid">';
    custom_filter_section += '<div class="navbar-header">';
    custom_filter_section += '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">';
    custom_filter_section += '<span class="icon-bar"></span>';
    custom_filter_section += '<span class="icon-bar"></span>';
    custom_filter_section += '<span class="icon-bar"></span>';
    custom_filter_section += '</button>';
    custom_filter_section += '<a class="navbar-brand" href="#">Filters</a>';
    custom_filter_section += '</div>';
    custom_filter_section += '<div class="collapse navbar-collapse" id="bs-navbar-collapse-1">';
    custom_filter_section += '<ul id="custom-filter" class="nav navbar-nav col-xs-12">';
    custom_filter_section += '<li class="filter col-xs-12 col-sm-4 col-md-4">';
    custom_filter_section += '<select id="decade-filter">';
    custom_filter_section += '<option value="reset" selected>--Filter By Decade--</option>';
    custom_filter_section += '<option value="2010">2010s</option>';
    custom_filter_section += '<option value="2000">2000s</option>';
    custom_filter_section += '<option value="1990">1990s</option>';
    custom_filter_section += '<option value="1980">1980s</option>';
    custom_filter_section += '<option value="1970">1970s</option>';
    custom_filter_section += '<option value="1960">1960s</option>';
    custom_filter_section += '<option value="1950">1950s</option>';
    custom_filter_section += '<option value="1940">1940s</option>';
    custom_filter_section += '</select>';
    custom_filter_section += '<button id="reset-decade-filter" class="filter-reset-button">X</button>';
    custom_filter_section += '</li>';
    custom_filter_section += '<li class="filter col-xs-12 col-sm-4 col-md-4">';
    custom_filter_section += '<select id="genre-filter">';
    custom_filter_section += '</select>';
    custom_filter_section += '<button id="reset-genre-filter" class="filter-reset-button">X</button>';
    custom_filter_section += '</li>';
    custom_filter_section += '<li class="filter col-xs-12 col-sm-4 col-md-4">';
    custom_filter_section += '<select id="country-filter">';
    custom_filter_section += '</select>';
    custom_filter_section += '<button id="reset-country-filter" class="filter-reset-button">X</button>';
    custom_filter_section += '</li>';  
    custom_filter_section += '</ul>';
    custom_filter_section += '</div>';
    custom_filter_section += '</section>';
    /*
    * END
    * content of the 'custom_filter_section'
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
			}
		},
		"dom": "<\"col-xs-12\"f<\"#search_reset\">><\"col-xs-12 navbar navbar-default\" <\"custom-filter-container container-fluid\">><\"col-xs-12\"i><\"col-sm-8 col-xs-12\"l><\"col-sm-4 col-xs-12\"p><\"col-xs-12\"t><\"col-sm-4 col-xs-12\"i><\"col-sm-8 col-xs-12\"p><\"col-xs-12\"l>r",
		"responsive" : true,
		"columnDefs": [
            {"orderable": false, "targets": [3, 10]},
            {"className": "never", "targets": [1, 11]},
            {"className": "none", "targets": [4, 9, 10]},
            {"className": "all strong", "targets": [0]},
            {"className": "all", "targets": [0]},
            {"className": "all", "targets": [3], "createdCell": addRowImages},
            {"className": "min-tablet", "targets": [5, 6]},
            {"className": "min-desktop", "targets": [2, 7, 8]}
        ],
        "order": [ 1, 'desc' ],
		"stateSave": false,
		"sPaginationType": "listbox",
        "drawCallback": prepareVideosTable
    }).fnFilterOnReturn();
    
    //assign a title-attribute to the #search-reset element
    $('#search_reset').attr('title', 'Reset Search').html('X');
    
    //assign HTML content to the .custom-filter-container class
    $('div.custom-filter-container').html(custom_filter_section);
	
    //assign a variable to
    //the videos dataTable API instance
	var videos_datatable = $('#videos_datatable').DataTable();
	
    /*
    * START
    * function for adding images
    * to the videos dataTable
    */
    function addRowImages(cell, cellData, rowData, row, col) {
        //assign variables for
        //populating certain attributes
        //of the HTML tags to be formed below
        var songtitle = rowData[0],
            altsongtitlesplit = rowData[0].split(' '),
            altsongtitle = altsongtitlesplit.join('-');
        
        //form a new img element
        var newCellHTML = '<img src="https://i3.ytimg.com/vi/'; 
        newCellHTML += cellData;
        newCellHTML += '/mqdefault.jpg" alt="'; 
        newCellHTML += altsongtitle;
        newCellHTML += '-thumbnail" ';
        newCellHTML += 'width="80%" ';
        newCellHTML += 'longdesc="Thumbnail for the Youtube karaoke video of \''; 
        newCellHTML += songtitle + '\'" />';
        
        //place the img element into
        //the relevent videos table TD
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
    * the karaoke description list
    */
    function populateKaraokedesclist() {
        videos_datatable.on('draw.dt', function () {
            //empty the karaokedesclist ul element
            //with each table render
            while ($('#karaokedesclist li').length > 0) {
                $('#karaokedesclist').empty();    
            }
            
            //if a video table search DOES NOT return a
            //"No Results Found" message
            //(there were results)
            if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) {
                //assign an empty variable
                //to be incremented later
                var video_index = 0;

                //remove those rows
                //where the YouTube video is offline
                $('#videos_datatable tbody tr').each(function () {
                    //increment video_index
                    video_index++;
                    var thisRow = $(this);
                    //add video_index data
                    thisRow.attr('data-index_position', video_index - 1);
                    var rowData = videos_datatable.row(thisRow).data(),
                        //assign variables for
                        //populating certain attributes
                        //of the HTML tags to be formed below
                        songtitle = rowData[0],
                        altsongtitlesplit = rowData[0].split(' '),
                        altsongtitle = altsongtitlesplit.join('-');
                    
                    //form a new li parent element
                    //with children
                    var karaokedesclistitem = '<li data-index_position="';
                        karaokedesclistitem += video_index - 1;
                        karaokedesclistitem += '">';
                        //rowData[3] is the Video ID data
                        karaokedesclistitem += '<img src="https://i3.ytimg.com/vi/' + rowData[3] + '/mqdefault.jpg" alt="' + altsongtitle + '-thumbnail" width="160px" height="90px" longdesc="Thumbnail for the Youtube karaoke video of \'' + songtitle + '\'" />';
                        //rowData[0] is the Song Title  
                        karaokedesclistitem += '<h4>' + rowData[0] + '</h4>';
                        //rowData[4] is the Composer data
                        karaokedesclistitem += '<p>(' + rowData[4] + ')</p>';
                        //rowData[2] is the Performer data
                        karaokedesclistitem += '<h5>As Popularized By: <strong>' + rowData[2] + '</strong></h5>';
                        //rowData[6] is the Source Album data
                        //rowData[7] is the Year Of Release data
                        //rowData[8] is the Country Of Origin data
                        //rowData[10] is the Lyrics data
                        karaokedesclistitem += '<p>From The Album: <em>' + rowData[6] + '</em> (' + rowData[7] + ', ' + rowData[8] + ')</p>';
                        karaokedesclistitem += '<p>' + rowData[10] + '</p>';
                        //rowData[9] is the Running Time data
                        karaokedesclistitem += '<p><em>' + rowData[9] + '</em></p>';
                        //rowData[5] is the Genre data
                        karaokedesclistitem += '<p><em>' + rowData[5] + '</em></p>';
                        //rowData[11] is the Added By data
                        karaokedesclistitem += '<p>Added By: ' + rowData[11] + '</p>';
                        
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
                    
                    //invoke the function
                    //for adding a 'Video Not Available' notification
                    addOfflineNotif('karaokedesclist', imgURL, thisLiItem);
                }); 
            }
            //if a video table search RETURNS a
            //"No Results Found" message
            //(there were null results)
            else if ($('#videos_datatable tbody tr td.dataTables_empty').length > 0) {
                //form a new li element
                //to appear as an error notification
                var karaokedesclistitem = '<li>';
                    karaokedesclistitem += 'Sorry, No Info To Show';
                    karaokedesclistitem += '</li>';
                
                //add the li element into
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
    * functions to be invoked
    * every time the videos dataTable
    * is rendered
    */
    function prepareVideosTable() {
        //assign a variable to
        //the videos dataTable API instance
        var videos_datatable = $('#videos_datatable').DataTable();
        
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
        
        //Promise Object
        //fill out the custom filter
        //for the genre
        get_filters.done(function (data) {
            $.each(data.genre, function (index, value) {
                $('#genre-filter').append('<option value="' + value + '">' + value + '</option>');    
            });
            //put reset option
            //at the beginning
            $('#genre-filter').prepend('<option value="reset">--Filter By Genre--</option>');
            //make sure to
            //assign the proper
            //filter value
            $('#genre-filter').val(genre_filter_value);
        })
        //fill out the custom filter
        //for the country of origin
        .done(function (data) {
            $.each(data.country_of_origin, function (index, value) {
                $('#country-filter').append('<option value="' + value + '">' + value + '</option>');    
            });
            //put reset option
            //at the beginning
            $('#country-filter').prepend('<option value="reset">--Filter By Country--</option>');
            //make sure to
            //assign the proper
            //filter value
            $('#country-filter').val(country_filter_value);
        });
        
        //if a video table search DOES NOT return a
        //"No Results Found" message
        //(there were results)
        if ($('#videos_datatable tbody tr td.dataTables_empty').length < 1) {
            //assign an empty variable
            //to be incremented later
            var video_index = 0;
            
            //remove those rows
            //where the YouTube video is offline
            $('#videos_datatable tbody tr').each(function () {
                //increment video_index
                video_index++;
                var thisRow = $(this);
                //add video_index data
                thisRow.attr('data-index_position', video_index - 1);
                var rowData = videos_datatable.row(thisRow).data();
                addOfflineNotif('videos_datatable', rowData, thisRow);
            });    
        } 
    }
    /*
    * functions to be invoked
    * every time the videos dataTable
    * is rendered
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
    
    //make the search reset button
    //functional
    $('#search_reset').on('click', function () {
        $('.form-control.input-sm').val('');
        videos_datatable.search('').draw();
    });
	
    //clicking the 'Reset' button
    //beside the search input
    //will reset the table
	$('#search-reset').click(function () {
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
/**
* END
* functions and behaviours
* assigned to the videos table element
* with the DataTables jQuery plug-in
*/
	
});