var whitebox = new Whitebox();;
var lastfm = new LastFM({
    apiKey    : '828c109e6a54fffedad5177b194f7107',
    apiSecret : '7c2f09e6eb84e8a6183c59e0bc574f70',
    cache     : new LastFMCache()
});

$(document).ready(function() {
    $("#open-help").click(function() {
        $.fancybox.open({
            href : 'help.html',
            type : 'iframe',
            padding : 5
        });
    });
    d3.json("data/json/recommendations.json", function(error, data) {
        whitebox.create(data);
    });
});

function addRecommendation(bandname) {
    whitebox.destroy();
    alert("Add recommendation " + bandname + " to my library.");
    d3.json("data/json/recommendations.json", function(error, data) {
        whitebox.create(data);
    });
}

function itemInfo(itemname, isrecommendation, user) {
    lastfm.artist.getInfo({
        artist    : itemname,
        user      : user
    },
    {
        success: function(data) {
            var bio = data.artist.bio.summary;
            jQuery('#item-info-description')
                .append(bio);
            if (isrecommendation) {
                d3.select('#item-info-controls')
                    .append('p')
                    .classed('soundsuggest-button', true)
                    .text('Add to Your Library')
                    .attr('onclick', 'addRecommendation("' + itemname + '");');
            }
        },
        error: function(data) {
            console.error(data.error + " " + data.message);
        }
    });
}

function userInfo(userName, isActiveUser, activeuser) {
    
}