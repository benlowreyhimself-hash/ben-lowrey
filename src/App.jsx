import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Hero from './components/Hero';

function App() {
  return (
    <Router>
      <div className="container" style={{ paddingTop: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Ben Lowrey</div>
          <nav>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="glass-panel" style={{ padding: '0.5rem 1rem', color: 'white', cursor: 'pointer' }}>Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div className="container">
                  <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Latest Adventures</h2>
                  <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Placeholders for Gallery */}
                    <div className="glass-panel" style={{ height: '400px' }}></div>
                    <div className="glass-panel" style={{ height: '400px' }}></div>
                    <div className="glass-panel" style={{ height: '400px' }}></div>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
