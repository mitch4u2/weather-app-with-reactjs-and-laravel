<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Psy\Util\Json;


class DarkSkyController extends Controller
{

    public function store(Request $request)
    {
        $latitude = $request->get('latitude');
        $longitude = $request->get('longitude');
        
// get the location coordinate
        $coord = $latitude.','.$longitude;
// store the dark sky api url
// Exclude hourly and flags from the API response. This is useful for reducing latency and saving cache space
        $apiurl = 'https://api.darksky.net/forecast/eb1a28e06530430fa6a336889e2846f7/'.$coord.'?exclude=hourly,minutely,flags&units=si';
// get the weather object from the url
        $weather = json_decode(file_get_contents($apiurl));

        // because running on localhost and gm api need an ssl certif i or we can download a certificate bundle 
        $arrContextOptions=array(
            "ssl"=>array(
                "verify_peer"=>false,
                "verify_peer_name"=>false,
            ),
        );

        $lat = 36.8064948;
        $lng = 10.1815316;
        // $coord ="51.2603015,4.2176376";
        // $coord ="35.6759,10.0919";     
        // $googlemap = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=35.6759,10.0919&result_type=street_address&key=AIzaSyAX1AOJ_EYCPyTMgob4r-m_qSDjfB75g1I';
        
        $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=".$coord."&language=en-EN&key=AIzaSyAX1AOJ_EYCPyTMgob4r-m_qSDjfB75g1I";
        $addr =  json_decode(file_get_contents($url, false, stream_context_create($arrContextOptions)));
        
        // dd($addr);
        return response()->json(array('weather'=>$weather,'addr'=>$addr));
    }

}
