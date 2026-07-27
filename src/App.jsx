import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackgroundFX from './components/BackgroundFX'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()

  return (
    <>
      <BackgroundFX />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
