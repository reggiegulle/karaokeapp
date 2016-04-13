$(document).ready(function () {
/**
* START
* functions and behaviours
* assigned to the videos table element
* with the DataTables jQuery plug-in
*/
    
	/* 
    * START
    * helper functions for
    * adding notifications to the videos datatable
    * where the image is not online
    * at YouTube
    */
    
    var vidOfflineNotif = '<div class="offline-notification">Sorry, video is unavailable</div>';
    
	function addOfflineNotif(srcData, htmlObj) {
        
        var url = 'https://i3.ytimg.com/vi/' + srcData[3] + '/mqdefault.jpg';

        $("<img/>").attr("src", url).load(function () {

            var s = {w: this.width, h: this.height};

            if (s.w === 120) {
                $(htmlObj)
                .children('td')
                .eq(3)
                .html(vidOfflineNotif);
            }
        });	
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
    
    /*
    * START
    * content of the 'custom_filter_section'
    */
    var search_icon = '<img src="images/search_icon.png" width="32px" height="32px" alt="search icon" id="search-icon" />';
    /*
    * END
    * content of the 'custom_filter_section'
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
    * utility variables
    * to be assigned as
    * values of data
    * to be sent over
    * the video datatable
    * AJAX request
    */
	var filter_yr_of_rlse = 'reset';
	var filter_genre = 'reset';
	var filter_country_origin = 'reset';
    var genre_filter_value = 'reset';
    var country_filter_value = 'reset';
    /*
    * END
    * utility variables
    * to be assigned as
    * values of data
    * to be sent over
    * the video datatable
    * AJAX request
    */
	
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
            {"className": "all", "targets": [3], 
                "createdCell": function (cell, cellData, rowData, row, col) {
                    var songtitle = rowData[0];
                    var altsongtitlesplit = rowData[0].split(' ');
                    var altsongtitle = altsongtitlesplit.join('-');
                    var newCellHTML = '<img src="https://i3.ytimg.com/vi/'; 
                    newCellHTML += cellData;
                    newCellHTML += '/mqdefault.jpg" alt="'; 
                    newCellHTML += altsongtitle;
                    newCellHTML += '-thumbnail" ';
                    newCellHTML += 'width="80%" ';
                    newCellHTML += 'longdesc="Thumbnail for the Youtube karaoke video of \''; 
                    newCellHTML += songtitle + '\'" />';
                    $(cell).html(newCellHTML);
                }
            },
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
                thisRow.attr('data-video_id', video_index - 1);
                var rowData = videos_datatable.row(thisRow).data();
                addOfflineNotif(rowData, thisRow);
            });    
        } 
    }
    /*
    * END
    * functions to be invoked
    * every time the videos dataTable
    * is rendered
    */
    
    //make the search reset button
    //functional
    $('#search_reset').on('click', function () {
        $('.form-control.input-sm').val('');
        videos_datatable.search('').draw();
    });
	
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