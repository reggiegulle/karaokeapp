<?php
    require_once 'includes/init.php';

    $video_filters_data = [];
    
    $video_genre_instance = new Video_filter();

    $video_genre_filter_query = $video_genre_instance->generate_vid_filter_opts('genre', 'videos');

    $video_genre_filters = $video_genre_filter_query->data();

    for ( $genrei=0; $genrei < count($video_genre_filters); $genrei++ ) {
        $video_filters_data['genre'][] = $video_genre_filters[$genrei]->genre;    
    }
    
    $video_country_instance = new Video_filter();

    $video_country_filter_query = $video_country_instance->generate_vid_filter_opts('country_of_origin', 'videos');

    $video_country_filters = $video_country_filter_query->data();

    for ( $origini=0; $origini < count($video_country_filters); $origini++ ) {
        $video_filters_data['country_of_origin'][] = $video_country_filters[$origini]->country_of_origin;    
    }
    
    echo  json_encode($video_filters_data);
?>