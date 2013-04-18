var ACTIVE_USER = '';
var SESSION_KEY = '';
var whitebox = new Whitebox();
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
    /**
    d3.json("data/json/recommendations.json", function(error, data) {
        whitebox.create(data);
    });
    */
    lastfm_data({
        user    : ACTIVE_USER,
        lastfm  : lastfm,
        key     : SESSION_KEY,
        limit_neighbours : 5,
        limit_recommendations : 5,
        limit_similar : 7,
        limit_top_artists : 5
    }, function(data) {
        whitebox.create(data);
    });
    /**/
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
    var html = '';
    var userinfo;
    if (! isActiveUser) {
        lastfm.user.getInfo({
            user      : userName
        }, {
            success : function(response1) {
                userinfo = response1;
                lastfm.tasteometer.compare({
                    value1  : activeuser,
                    value2  : userName,
                    type1   : 'user',
                    type2   : 'user'
                }, {
                    success : function(response2) {
                        var score = Number(response2.comparison.result.score) * 100;
                        html += '<p>The similarity score between you and ' + userName
                                + ' equals ' + score.toFixed(2)
                                + '%.</p>';
                        html += '<p>Click <a href="' + userinfo.user.url
                                + '" target="_blank" title="' + userinfo.user.name
                                + '\'s profile">here</a> to visit the full profile.</p>';
                        jQuery('#user-info-description')
                            .append(html);
                    },
                    error : function(error) {}
                });
            },
            error : function(error) {}
        });
    } else {
        // Active user's profile.
    }
}