interface MP3Options {
  volume: number;
}
const isMediaApiSupported = (mimeType: string, showError = true) => {
  const isSupported =
    'MediaSource' in window && MediaSource.isTypeSupported(mimeType);
  if (showError && !isSupported) {
    console.log('MediaSource is not supported');
  }
  return isSupported;
};

const audioElementMap = new Map<
  string,
  {
    el: HTMLAudioElement;
    mediaSource: MediaSource;
  }
>();

function fetchAudio(url: string, cb: (resonse: any) => void) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    cb(xhr.response);
  };
  xhr.send();
}

// Воспроизведение mp3 файла
export const playMp3sound = (sourceUrl: string, options?: MP3Options) => {
  if (isMediaApiSupported('audio/mpeg')) {
    const mediaEl = audioElementMap.get(sourceUrl);
    if (!mediaEl) {
      audioElementMap.set(sourceUrl, {
        el: document.createElement('audio'),
        mediaSource: new MediaSource(),
      });
    }
    if (!mediaEl) {
      return;
    }
    const { mediaSource, el } = mediaEl;
    // Еще не выполнили загрузку
    if (mediaSource.readyState === 'open') {
      // Добавим обработчик, когда данные загрузятся
      mediaSource.addEventListener('sourceended', () => {
        el.play();
      });
      return;
    }
    // Уже выполнили
    if (mediaSource.readyState === 'ended') {
      el.play();
      return;
    }
    if (options?.volume) {
      mediaEl.el.volume = options.volume;
    }
    // Загрузка файла
    el.src = URL.createObjectURL(mediaSource);
    // Событие когда HTMLAUdioElement (el) будет готов принять данные
    mediaSource.addEventListener('sourceopen', () => {
      // Создаем буфер
      const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
      // Загружаем аудио
      fetchAudio(sourceUrl, buf => {
        sourceBuffer.addEventListener('updateend', () => {
          mediaSource.endOfStream();
          el.play();
        });
        // Загружаем данные в буфер
        sourceBuffer.appendBuffer(buf);
      });
    });
  }
};
