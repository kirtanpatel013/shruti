const { useState, useEffect } = React;

function ProposalApp() {
  const [step, setStep] = useState(1); // 1: Q1, 2: Q2, 3: Q3, 4: Success, 5: Rejection
  const [dodgeCount, setDodgeCount] = useState(0);
  const [declineOffset, setDeclineOffset] = useState({ x: 0, y: 0 });
  const [celebrationHearts, setCelebrationHearts] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Photos array provided by the user
  const photos = [
    {
      src: './images/photo1.jpg',
      caption: 'Us forever 💑'
    },
    {
      src: './images/photo2.jpg',
      caption: 'Prettiest girl in the world ✨'
    },
    {
      src: './images/photo3.jpg',
      caption: 'My favorite smile 🥰'
    },
    {
      src: './images/photo4.jpg',
      caption: 'Cute & absolute perfection 💖'
    }
  ];

  // Data for multi-step question flow
  const questions = {
    1: {
      title: "Will you be my girlfriend? 💕",
      acceptText: "Yes, always!",
      declineText: "Nah"
    },
    2: {
      title: "Wanna go on a date? 🎉",
      acceptText: "Absolutely!",
      declineText: "Nope"
    },
    3: {
      title: "Group hug? 🤗",
      acceptText: "Bring it in!",
      declineText: "Pass"
    }
  };

  // Handle Accept Button Click
  const handleAccept = () => {
    // Reset decline button position for next step
    setDeclineOffset({ x: 0, y: 0 });

    if (step < 3) {
      setStep(prev => prev + 1);
    } else if (step === 3) {
      // Advance to final success screen
      setStep(4);
      triggerCelebration();
    }
  };

  // Handle Decline Hover (Dodge Mechanic)
  const handleDeclineHover = () => {
    if (dodgeCount < 5) {
      // Random X offset between -100px and 100px
      const randomX = Math.floor(Math.random() * 200) - 100;
      // Random Y offset between -50px and 50px
      const randomY = Math.floor(Math.random() * 100) - 50;

      setDeclineOffset({ x: randomX, y: randomY });
      setDodgeCount(prev => prev + 1);
    }
  };

  // Handle Decline Button Click
  const handleDeclineClick = () => {
    if (dodgeCount >= 5) {
      // Rejection screen state
      setStep(5);
    } else {
      // If clicked before dodge limit (e.g., touch device), trigger a dodge
      handleDeclineHover();
    }
  };

  // Handle "Let's try again" Reset
  const handleReset = () => {
    setStep(1);
    setDodgeCount(0);
    setDeclineOffset({ x: 0, y: 0 });
    setCelebrationHearts([]);
    setCurrentPhotoIndex(0);
  };

  // Celebration Animation Trigger
  const triggerCelebration = () => {
    const hearts = Array.from({ length: 18 }).map((_, index) => {
      const hue = Math.floor(330 + Math.random() * 60); // pink to red range (330 - 390 deg)
      const left = 5 + Math.random() * 85; // 5% to 85% width inside screen
      const duration = 3.5 + Math.random() * 3; // 3.5s to 6.5s
      const delay = Math.random() * 1; // stagger start times slightly
      const size = Math.floor(24 + Math.random() * 14); // ~30px

      return {
        id: `${Date.now()}-${index}`,
        hue,
        left,
        duration,
        delay,
        size
      };
    });

    setCelebrationHearts(hearts);

    // Clean up floating hearts after animation finishes
    setTimeout(() => {
      setCelebrationHearts([]);
    }, 7000);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  const isRejection = step === 5;
  const isSuccess = step === 4;

  return (
    <div className={`proposal-card ${isSuccess ? 'success-card' : ''}`}>
      {/* Coquette Ribbon Bow Decorative Header */}
      <svg className="bow-accent" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,45 C40,25 15,20 15,38 C15,55 42,48 50,48 C58,48 85,55 85,38 C85,20 60,25 50,45 Z" fill="#ff4b6e" />
        <path d="M50,48 C42,65 25,85 30,90 C35,95 48,65 50,52 C52,65 65,95 70,90 C75,85 58,65 50,48 Z" fill="#ff3356" />
        <circle cx="50" cy="46" r="6" fill="#ffffff" />
        <circle cx="50" cy="46" r="4.5" fill="#ff4b6e" />
      </svg>

      {/* Heart Icon Header */}
      <div className="heart-container">
        {!isRejection ? (
          <>
            {/* Pulsing Pink Heart SVG */}
            <svg
              className="pulsing-heart"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 88.7L14.6 53.3C6.7 45.4 6.7 32.6 14.6 24.7C22.5 16.8 35.3 16.8 43.2 24.7L50 31.5L56.8 24.7C64.7 16.8 77.5 16.8 85.4 24.7C93.3 32.6 93.3 45.4 85.4 53.3L50 88.7Z" />
            </svg>

            {/* 3 Gold Sparkle Dots */}
            <svg className="sparkle-dot dot-1" viewBox="0 0 20 20">
              <polygon points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7" />
            </svg>
            <svg className="sparkle-dot dot-2" viewBox="0 0 20 20">
              <polygon points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7" />
            </svg>
            <svg className="sparkle-dot dot-3" viewBox="0 0 20 20">
              <polygon points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7" />
            </svg>
          </>
        ) : (
          /* Static Broken Gray Heart SVG */
          <svg
            className="broken-heart"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 88.7L14.6 53.3C6.7 45.4 6.7 32.6 14.6 24.7C22.5 16.8 35.3 16.8 43.2 24.7L50 31.5L56.8 24.7C64.7 16.8 77.5 16.8 85.4 24.7C93.3 32.6 93.3 45.4 85.4 53.3L50 88.7Z" />
            <path
              d="M50 25 L45 38 L55 52 L43 68 L50 88"
              fill="none"
              stroke="#252432"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Multi-Step Question / Screen Content */}
      <div className="step-container" key={step}>
        {/* Questions 1, 2, 3 */}
        {step >= 1 && step <= 3 && (
          <>
            <h2 className="question-text">{questions[step].title}</h2>
            <div className="buttons-group">
              <button className="btn btn-accept" onClick={handleAccept}>
                {questions[step].acceptText}
              </button>
              <button
                className="btn btn-decline"
                style={{
                  transform: `translate(${declineOffset.x}px, ${declineOffset.y}px)`
                }}
                onMouseEnter={handleDeclineHover}
                onClick={handleDeclineClick}
              >
                {questions[step].declineText}
              </button>
            </div>
          </>
        )}

        {/* Final Success Screen with Photo Gallery */}
        {isSuccess && (
          <>
            <h2 className="success-text">
              Yay! You're officially my girlfriend! 💛
            </h2>

            {/* Interactive Polaroid Photo Gallery */}
            <div className="polaroid-container">
              <div className="polaroid-card">
                <div className="polaroid-tape"></div>
                <div className="polaroid-img-wrapper">
                  <img
                    src={photos[currentPhotoIndex].src}
                    alt="Memory"
                    className="polaroid-img"
                  />
                </div>
                <div className="polaroid-caption">
                  {photos[currentPhotoIndex].caption}
                </div>
              </div>

              {/* Gallery Navigation Controls */}
              <div className="gallery-nav">
                <button className="nav-arrow" onClick={prevPhoto} aria-label="Previous photo">
                  ‹
                </button>

                {/* Thumbnails */}
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

                <button className="nav-arrow" onClick={nextPhoto} aria-label="Next photo">
                  ›
                </button>
              </div>
            </div>
          </>
        )}

        {/* Rejection Screen */}
        {isRejection && (
          <>
            <h2 className="question-text">
              😢 Oh no... still together, right?
            </h2>
            <div className="buttons-group">
              <button className="btn btn-reset" onClick={handleReset}>
                Let's try again
              </button>
            </div>
          </>
        )}
      </div>

      {/* Floating Celebration Hearts Animation */}
      {celebrationHearts.map(heart => (
        <svg
          key={heart.id}
          className="celebration-heart"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            fill: `hsl(${heart.hue}, 100%, 65%)`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`
          }}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 88.7L14.6 53.3C6.7 45.4 6.7 32.6 14.6 24.7C22.5 16.8 35.3 16.8 43.2 24.7L50 31.5L56.8 24.7C64.7 16.8 77.5 16.8 85.4 24.7C93.3 32.6 93.3 45.4 85.4 53.3L50 88.7Z" />
        </svg>
      ))}
    </div>
  );
}

// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProposalApp />);
