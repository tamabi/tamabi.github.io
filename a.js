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

var enjoyLyrics = function(lyrics) {
    var verse = document.createElement('div');
    verse.className = 'verse';
    stage.appendChild(verse);
    var done = 0;
    var i = 0;
    for (i = 0; i < lyrics.length; i++) {
        var lyric = lyrics[i];
        enjoyLyric(verse, lyric, function() {
            done++;
            if (done == lyrics.length) {
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
