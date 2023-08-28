const newsVideoHandler = () => {
  const players = document.querySelectorAll('.news-video-frame');

  players.forEach(player => {
    const wrap = player.parentElement;
    const content = player.parentElement.nextElementSibling;
    
    wrap.classList.add('_loading');
    const youtubePlayer = new YT.Player(player, {
      width: player.dataset.width, 
      height: player.dataset.height,
      videoId: player.dataset.src,
      playerVars: {
        autoplay: 0,
        'clipboard-write': 1,
        'encrypted-media': 1,
        'picture-in-picture': 1,
        allowfullscreen: 1,
      },
      events: {
        onStateChange: ({data}) => {
          switch(data) {
            case 1: content?.classList.add('_hidden'); break;
            case 2: content?.classList.remove('_hidden'); break;
          }
        },
        onReady: () => {
          wrap.classList.remove('_loading');
        }
      }
    });

    youtubePlayer.sendMessage = function (options) {
      this?.g?.contentWindow.postMessage(JSON.stringify({...options, id: this.id, channel: 'widget'}), '*');
    };

  });
};

export default newsVideoHandler;
