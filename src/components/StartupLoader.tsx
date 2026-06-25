import { useEffect, useState, useRef } from 'react'
import { Shield, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

type Screen = 'video' | 'password' | 'loading' | 'done'

interface Props {
  onUnlock: () => void
}

export default function StartupLoader({ onUnlock }: Props) {
  const [screen, setScreen] = useState<Screen>('video')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoEnd = () => {
    setScreen('password')
  }

  const handleSkipVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setScreen('password')
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'Karla15') {
      setError('')
      setScreen('loading')
      setTimeout(() => setStep(1), 300)
      setTimeout(() => setStep(2), 800)
      setTimeout(() => setStep(3), 1400)
      setTimeout(() => onUnlock(), 2000)
    } else {
      setError('Incorrect password. Try again.')
      setPassword('')
    }
  }

  return (
    <div className="startup-screen">
      {/* === VIDEO SCREEN - WITH SOUND === */}
      {screen === 'video' && (
        <div className="video-container" onClick={handleSkipVideo}>
          <video
            ref={videoRef}
            className="intro-video"
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay">
            <div className="video-skip">Click to skip</div>
            <div className="video-brand">
              <Shield size={32} className="logo-icon" />
              <h2>7J<span className="amp">&</span>Tech</h2>
              <p>Digital Solutions</p>
            </div>
          </div>
        </div>
      )}

      {/* === PASSWORD SCREEN === */}
      {screen === 'password' && (
        <div className="password-container">
          <div className="password-card">
            <div className="logo-ring" style={{ width: 80, height: 80, marginBottom: 24 }}>
              <Lock size={32} className="logo-icon" />
            </div>
            <h2 className="startup-title" style={{ fontSize: '1.75rem' }}>Welcome</h2>
            <p className="startup-subtitle" style={{ marginBottom: 32 }}>
              Enter password to access dashboard
            </p>

            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="password-input-wrapper">
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Enter password"
                  className={`password-input ${error ? 'error' : ''}`}
                  autoFocus
                />
                <button type="submit" className="password-submit">
                  <ArrowRight size={20} />
                </button>
              </div>
              {error && <p className="password-error">{error}</p>}
            </form>

            <div className="security-badges" style={{ marginTop: 32 }}>
              <div className="badge active">
                <Lock size={14} /> Secure Access
              </div>
              <div className="badge active">
                <EyeOff size={14} /> Hidden Mode
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === LOADING SCREEN === */}
      {screen === 'loading' && (
        <div className="startup-content">
          <div className="logo-ring">
            <Shield size={48} className="logo-icon" />
          </div>
          <h1 className="startup-title">7J<span className="amp">&</span>Tech</h1>
          <p className="startup-subtitle">Digital Solutions</p>

          <div className="security-badges">
            <div className={`badge ${step >= 1 ? 'active' : ''}`}>
              <Lock size={14} /> Encrypted
            </div>
            <div className={`badge ${step >= 2 ? 'active' : ''}`}>
              <EyeOff size={14} /> Hidden Mode
            </div>
            <div className={`badge ${step >= 3 ? 'active' : ''}`}>
              <Shield size={14} /> Protected
            </div>
          </div>

          <div className="loading-bar">
            <div className="loading-fill" style={{ width: `${(step + 1) * 33}%` }} />
          </div>
          <p className="startup-hint">Initializing secure environment...</p>
        </div>
      )}
    </div>
  )
}
