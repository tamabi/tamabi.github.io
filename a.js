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
    verse.appendChild(document.createElement('br'));
};

var enjoyTime = 0;
var enjoyLyrics = function(lyrics, cb) {
    var verseContainer = document.createElement('h2');
    verseContainer.className = 'verse-container';

    var verse = document.createElement('span');
    verse.className = 'verse';
    var singer = document.querySelector(enjoyTime++ % 2 ? '.hitode909' : '.shikakun');
    verseContainer.appendChild(singer.cloneNode());
    verseContainer.appendChild(verse);
    stage.appendChild(verseContainer);
    var done = 0;
    var i = 0;
    for (i = 0; i < lyrics.length; i++) {
        var lyric = lyrics[i];
        enjoyLyric(verse, lyric, function() {
            done++;
            if (done == lyrics.length) {
                appendTweetButton(verseContainer);
                if (cb) {
                    cb();
                } else {
                    enjoyLyrics(lyrics);
                }
            }
        }, 0);
    }
};

var lyrics = [
];

var preludes = [
    ['このたび'],
    ['多摩ビTシャツ'],
    ['新発売'],
    ['相成りました'],
    ['めでたい'],
    ['多摩川ビール'],
    ['Tシャツ新発売']
];
var select = function(a) {
    return a[Math.floor(a.length * Math.random())];
}
var preludes2 = [];
var i = 0;

var shout = function() {
    var lyrics = preludes[i++];
    if (lyrics) {
        enjoyLyrics(lyrics, shout);
    } else {
        enjoyLyrics([select(preludes)[0], select(preludes)[0]], shout);
    }
};
shout();

var switchShirts = function() {
  var i = 0;
  var items = document.querySelectorAll('.suzuri-widget-product');
  setInterval(function() {
    i++;
    items.forEach(function(item, index) {
      if (i%items.length == index) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    })
  }, 1000);
}
document.addEventListener('DOMContentLoaded', function() {
  switchShirts();
})

document.body.addEventListener('click', function() {
    var audios = document.querySelectorAll('audio');
    var i = 0;
    for(i = 0; i < audios.length; i++) {
        audios[i].play();
    }
}, false);
