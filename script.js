$(document).ready(function(){
    $('#searchSongs').on('click',function(){
        var artistURL = $('#selectArtist').val();
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + artistURL,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                console.log(result);
                myFunction(result);
            },
            error: function() { alert('Failed!'); }
        });
    });

    function fillList(){
        for (var i = 0; i < allArtists.length; i++){
            document.getElementById("selectArtist").innerHTML += "<option value ='" + allArtists[i].value + "'>" + allArtists[i].name + "</option>";
        }
    }
    fillList();

});

function myFunction(json){
    var html = "";
    var artist = $('#selectArtist').val();
    var num = 1;
    if(artist == 0){
        document.getElementById("songResults").innerHTML = "PLEASE SELECT AN ARTIST!";
    }
    else{
        for(var s=0; s<$('#numberOfSongs').val(); s++){
            html += "<tr><td>" + num + "</td>";
            html += "<td><img src =" + json.results[s].artworkUrl60 + "></td>";
            html += "<td>" + json.results[s].trackName + "</td>";
            html += "<td>" + "<audio controls='true' src='" + json.results[s].previewUrl + "' id='audio' type='audio/m4a'></audio>" + "</td></tr>";
            num ++;
        }
        document.getElementById("songResults").innerHTML = html;
    }


}
