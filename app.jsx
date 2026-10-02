const { useState } = React;

const HEART_PATH = "M50 88.7L14.6 53.3C6.7 45.4 6.7 32.6 14.6 24.7C22.5 16.8 35.3 16.8 43.2 24.7L50 31.5L56.8 24.7C64.7 16.8 77.5 16.8 85.4 24.7C93.3 32.6 93.3 45.4 85.4 53.3L50 88.7Z";
const MAX_DODGES = 5;

// Put your 4 photos in the same folder as index.html
const photos = [
  { src: './photo1.jpg',  caption: 'Us forever 🧸' },
  { src: './photo2.jpg',  caption: 'Best boyfriend in the world 🎀' },
  { src: './photo3.jpg',  caption: 'My favorite smile 🥰' },
  { src: './photo4.jpeg', caption: 'Cute & absolute perfection ❤️' }
];

const questions = {
  1: { title: "Will you be my boyfriend? 💕", acceptText: "Yes, always!", declineText: "Nah" },
  2: { title: "Wanna go on a date? 🎉",       acceptText: "Absolutely!",  declineText: "Nope" },
  3: { title: "Group hug? 🤗",                acceptText: "Bring it in!", declineText: "Pass" }
};

function ProposalApp() {
  const [step, setStep] = useState(1); // 1-3 questions, 4 success, 5 rejection
  const [dodgeCount, setDodgeCount] = useState(0);
  const [declineOffset, setDeclineOffset] = useState({ x: 0, y: 0 });
  const [celebrationHearts, setCelebrationHearts] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleAccept = () => {
    setDeclineOffset({ x: 0, y: 0 });
    setDodgeCount(0); // "Nah" dodges again on every question
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
      triggerCelebration();
    }
  };

  const handleDeclineHover = () => {
    if (dodgeCount < MAX_DODGES) {
      setDeclineOffset({
        x: Math.floor(Math.random() * 200) - 100,
        y: Math.floor(Math.random() * 100) - 50
      });
      setDodgeCount(prev => prev + 1);
    }
  };

  const handleDeclineClick = () => {
    if (dodgeCount >= MAX_DODGES) setStep(5);
    else handleDeclineHover(); // touch devices: tapping also dodges
  };

  const handleReset = () => {
    setStep(1);
    setDodgeCount(0);
    setDeclineOffset({ x: 0, y: 0 });
    setCelebrationHearts([]);
    setCurrentPhotoIndex(0);
  };

  const triggerCelebration = () => {
    const hearts = Array.from({ length: 18 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      hue: Math.floor(Math.random() * 35),      // coral / red-orange
      left: 5 + Math.random() * 85,
      duration: 3.5 + Math.random() * 3,
      delay: Math.random(),
      size: Math.floor(24 + Math.random() * 14)
    }));
    setCelebrationHearts(hearts);
    setTimeout(() => setCelebrationHearts([]), 7000);
  };

  const nextPhoto = () => setCurrentPhotoIndex(p => (p + 1) % photos.length);
  const prevPhoto = () => setCurrentPhotoIndex(p => (p - 1 + photos.length) % photos.length);

  const isRejection = step === 5;
  const isSuccess = step === 4;

  return (
    <div className={`proposal-card ${isSuccess ? 'success-card' : ''}`}>
      {/* Ribbon bow */}
      <svg className="bow-accent" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,45 C40,25 15,20 15,38 C15,55 42,48 50,48 C58,48 85,55 85,38 C85,20 60,25 50,45 Z" fill="#d4453e" />
        <path d="M50,48 C42,65 25,85 30,90 C35,95 48,65 50,52 C52,65 65,95 70,90 C75,85 58,65 50,48 Z" fill="#c23a34" />
        <circle cx="50" cy="46" r="6" fill="#ffffff" />
        <circle cx="50" cy="46" r="4.5" fill="#d4453e" />
      </svg>

      {/* Heart */}
      <div className="heart-container">
        {!isRejection ? (
          <>
            <svg className="pulsing-heart" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d={HEART_PATH} />
            </svg>
            {["dot-1", "dot-2", "dot-3"].map(d => (
              <svg key={d} className={`sparkle-dot ${d}`} viewBox="0 0 20 20">
                <polygon points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7" />
              </svg>
            ))}
          </>
        ) : (
          <svg className="broken-heart" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d={HEART_PATH} />
            <path d="M50 25 L45 38 L55 52 L43 68 L50 88" fill="none" stroke="#252432"
                  strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <div className="step-container" key={step}>
        {step >= 1 && step <= 3 && (
          <>
            <h2 className="question-text">{questions[step].title}</h2>
            <div className="buttons-group">
              <button className="btn btn-accept" onClick={handleAccept}>
                {questions[step].acceptText}
              </button>
              <button
                className="btn btn-decline"
                style={{ transform: `translate(${declineOffset.x}px, ${declineOffset.y}px)` }}
                onMouseEnter={handleDeclineHover}
                onClick={handleDeclineClick}
              >
                {questions[step].declineText}
              </button>
            </div>
          </>
        )}

        {isSuccess && (
          <>
            <h2 className="success-text">Yay! You're officially my boyfriend! 💛</h2>
            <div className="polaroid-container">
              <div className="polaroid-card">
                <div className="polaroid-img-wrapper">
                  <img src={photos[currentPhotoIndex].src} alt="Memory" className="polaroid-img" />
                </div>
                <div className="polaroid-caption">{photos[currentPhotoIndex].caption}</div>
              </div>

              <div className="gallery-nav">
                <button className="nav-arrow" onClick={prevPhoto} aria-label="Previous photo">‹</button>
                <div className="photo-thumbnails">
                  {photos.map((p, idx) => (
                    <button
                      key={idx}
                      className={`thumb-btn ${idx === currentPhotoIndex ? 'active' : ''}`}
                      onClick={() => setCurrentPhotoIndex(idx)}
                    >
                      <img src={p.src} alt={`Thumb ${idx + 1}`} className="thumb-img" />
                    </button>
                  ))}
                </div>
                <button className="nav-arrow" onClick={nextPhoto} aria-label="Next photo">›</button>
              </div>
            </div>
          </>
        )}

        {isRejection && (
          <>
            <h2 className="question-text">😢 Oh no... still together, right?</h2>
            <div className="buttons-group">
              <button className="btn btn-reset" onClick={handleReset}>Let's try again</button>
            </div>
          </>
        )}
      </div>

      {celebrationHearts.map(h => (
        <svg
          key={h.id}
          className="celebration-heart"
          style={{
            left: `${h.left}%`, width: `${h.size}px`, height: `${h.size}px`,
            fill: `hsl(${h.hue}, 85%, 60%)`,
            animationDuration: `${h.duration}s`, animationDelay: `${h.delay}s`
          }}
          viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        >
          <path d={HEART_PATH} />
        </svg>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ProposalApp />);
