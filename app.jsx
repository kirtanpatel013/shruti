const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Config: edit text and photos here only ---------- */
const MAX_DODGES = 5;

const PHOTOS = [
  { src: './photo1.jpg',  caption: 'Us forever 💑' },
  { src: './photo2.jpg',  caption: 'Best boyfriend in the world ✨' },
  { src: './photo3.jpg',  caption: 'My favorite smile 🥰' },
  { src: './photo4.jpeg', caption: 'Cute & absolute perfection 💖' },
];

const QUESTIONS = [
  { title: 'Will you be my boyfriend? 💕', accept: 'Yes, always!', decline: 'Nah' },
  { title: 'Wanna go on a date? 🎉',       accept: 'Absolutely!',  decline: 'Nope' },
  { title: 'Give me a hug? 🤗',            accept: 'Bring it in!', decline: 'Pass' },
];

const SUCCESS_TEXT = "Yay! You're officially my boyfriend! 💛";
const REJECT_TEXT  = '😢 Oh no... still together, right?';

const HEART_PATH = 'M50 88.7L14.6 53.3C6.7 45.4 6.7 32.6 14.6 24.7C22.5 16.8 35.3 16.8 43.2 24.7L50 31.5L56.8 24.7C64.7 16.8 77.5 16.8 85.4 24.7C93.3 32.6 93.3 45.4 85.4 53.3L50 88.7Z';
const SPARKLE = '10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7';

/* ---------- Small components ---------- */
function Photo({ src, className, alt }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed) return <span className="img-fallback" role="img" aria-label="Photo missing">💗</span>;
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

function Gallery() {
  const [i, setI] = useState(0);
  const go = useCallback((d) => setI((p) => (p + d + PHOTOS.length) % PHOTOS.length), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
