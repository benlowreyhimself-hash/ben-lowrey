import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import PhotoGrid from './components/gallery/PhotoGrid';
import LifeTimeline from './components/bio/LifeTimeline';

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
            <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
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
                <section className="section">
                  <div className="container">
                    <h2 className="text-center">Latest Adventures</h2>
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
