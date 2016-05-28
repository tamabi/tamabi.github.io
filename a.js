var stage = document.querySelector('#stage');

var enjoyLyric = function(verse, lyric, cb, i) {
    if (lyric.length == i) {
        cb();
        return;
    }

    var interval = Math.random() * 1000;
    var timer = setTimeout(function() {
        var char = lyric[i];
        verse.textContent = verse.textContent + char;
        enjoyLyric(verse, lyric, cb, i+1);
    }, interval);
}

var appendTweetButton = function(verse) {
    var tweetContainer = document.createElement('span');
    tweetContainer.setAttribute('class', 'tweet-button-container');
    verse.appendChild(tweetContainer);

    var lyric = verse.textContent;

    window.twttr.widgets.createShareButton(
        'https://tamabi.github.io/',
        tweetContainer,
        {
            text: lyric,
            hashtags: '多摩ビ'
        }
    );
};

var enjoyLyrics = function(lyrics) {
    var verse = document.createElement('h3');
    verse.className = 'verse';
    stage.appendChild(verse);
    var done = 0;
    var i = 0;
    for (i = 0; i < lyrics.length; i++) {
        var lyric = lyrics[i];
        enjoyLyric(verse, lyric, function() {
            done++;
            if (done == lyrics.length) {
                appendTweetButton(verse);
                enjoyLyrics(lyrics);
            }
        }, 0);
    }
};

var lyrics = [
    '多摩川ビール'.split(''),
    'Tシャツ新発売'.split('')
];

enjoyLyrics(lyrics);
