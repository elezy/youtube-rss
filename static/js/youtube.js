if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}


$(function() {
    var FEED_URL = 'https://www.youtube.com/feeds/videos.xml?',
        RE_PREFIX = '^(?:https?:?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))\/',
        DATA = {
            'channel': {
                'query': 'channel_id={0}',
                're': 'channel\/([a-zA-Z0-9\-_]+)',
            },

            'user': {
                'query': 'user={0}',
                're': 'user\/([a-zA-Z0-9\-_]+)',
            },

            'playlist': {
                'query': 'playlist_id={0}',
                're': '?.*list=([a-zA-Z0-9-_]+).*',
            }
        };


    $('form').submit(function() {
        var $input = $('input[name="url"]'),
            url = $input.val();

        ga('send', 'event', {
            eventCategory: 'RSS',
            eventAction: 'generate',
            eventLabel: url
        });

        if (!url) {
            $input.focus();
            return false;
        }


        for (i in DATA) {
            var data = DATA[i],
                re = new RegExp(RE_PREFIX + data['re']),
                result = re.exec(url);

            console.log(result);

            if (!result || result.count < 4) {
                continue;
            }

            location.href = (FEED_URL + data['query']).format(result[3]);
            return false;
        }

        alert('Please enter exact youtube url');
        return false;
    });
});
