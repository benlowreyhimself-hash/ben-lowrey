import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import PhotoGrid from './components/gallery/PhotoGrid';
import LifeTimeline from './components/bio/LifeTimeline';
import LifeSection from './components/LifeSection';
import logo from './assets/logo.jpg';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <header style={{
          backgroundColor: '#fff',
          boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
          padding: '15px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={logo} alt="Ben Lowrey Logo" style={{ height: '50px', width: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div className="logo" style={{ fontSize: '1.8rem', fontWeight: '700', color: '#333' }}>Ben Lowrey</div>
            </Link>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link to="/about" style={{ color: '#333', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase' }}>About</Link>
              <Link to="/gallery" style={{ color: '#333', textDecoration: 'none', fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase' }}>Gallery</Link>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />

                {/* Intro Section */}
                <LifeSection
                  title="Welcome"
                  text={[
                    "My name is Ben. I'm a creative entrepreneur, event organiser, business owner, & property developer living in South Wales, UK."
                  ]}
                  videos={[
                    { id: 'BnfhFYEMI2I', title: 'South Wales Property Meet' }
                  ]}
                />

                {/* Property Section */}
                <LifeSection
                  title="Property & Business"
                  text={[
                    "I am actively involved in property development and short-term rentals."
                  ]}
                  videos={[
                    { id: 'sYD_bR2KSds', title: 'AirBnB in Swansea' },
                    { id: 'WFa8Q_vSq1Y', title: 'Property Progress - South Wales' }
                  ]}
                />

                {/* Adventures Section */}
                <LifeSection
                  title="Adventures & Nature"
                  text={[
                    "Exploring the beautiful landscapes of Wales and beyond is a huge part of my life."
                  ]}
                  videos={[
                    { id: 'U84KQ-y7-s4', title: 'Barn Hill Nature' },
                    { id: 'NqXg6E2PSmM', title: 'Real Awake - Woodland Walk' }
                  ]}
                />

                {/* Handstands / Fitness */}
                <LifeSection
                  title="Handstands & Movement"
                  date="2013 - Present"
                  text={[
                    "In 2013, I decided I wanted to learn how to Handstand. It became a discipline that taught me patience and body control."
                  ]}
                  videos={[
                    { id: 'GglFEos8yRk', title: 'How to Handstand Tutorial' }
                  ]}
                />

                {/* Lightshow */}
                <LifeSection
                  title="The Circoplex Lightshow"
                  date="2018"
                  text={[
                    "I've always been fascinated with ambient lighting.",
                    "In 2018 I spent 3 months building an addressable LED lightshow to use at my Yoga events."
                  ]}
                  videos={[
                    { id: 'kwkZYW7zTy8', title: 'The Circoplex Lightshow' },
                    { id: 'sq2MAAt6Zig', title: 'Circoplex Sunday' }
                  ]}
                />

                {/* Music */}
                <LifeSection
                  title="Music & Guitar"
                  date="2006 - 2013"
                  text={[
                    "From age 9 to 22, I played electric guitar.",
                    "In my teenage years I taught guitar, and played in bands. In 2006 I transitioned to uploading video guitar lessons to the internet, resulting in the successful vGuitarLessons.com."
                  ]}
                  videos={[
                    { id: 'MGNTca9Eo0c', title: 'Rock n Roll Lesson' }
                  ]}
                />

                {/* Spirituality */}
                <LifeSection
                  title="Spirituality & Exploration"
                  date="2008"
                  text={[
                    "In 2008 I first did Ayahuasca at a Shamanic Ceremony in Glastonbury. This opened my mind to new perspectives on consciousness."
                  ]}
                  videos={[
                    { id: 'FhMXdeo3RU4', title: 'Benefits of Magic Mushroom' }
                  ]}
                />

                {/* Fire Spinning - Adding this here as it fits the performance/skill vibe */}
                <LifeSection
                  title="Fire Spinning"
                  text={[
                    "Flow arts and fire spinning have been another avenue for movement expression."
                  ]}
                  videos={[
                    { id: 'yX3l-KThTIY', title: 'Double Staff Fire Spinning' }
                  ]}
                />

                <section className="section">
                  <div className="container">
                    <h2 className="text-center">Latest Photos</h2>
                    <PhotoGrid limit={6} />
                    <div className="text-center" style={{ marginTop: '40px' }}>
                      <Link to="/gallery">
                        <button className="btn btn-primary">View Full Gallery</button>
                      </Link>
                    </div>
                  </div>
                </section>
              </>
            } />
            <Route path="/about" element={<LifeTimeline />} />
            <Route path="/gallery" element={
              <section className="section">
                <div className="container">
                  <h1 className="text-center">Gallery</h1>
                  <PhotoGrid />
                </div>
              </section>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
