
import './App.css'
import Footer from './components/footer';

import Main from './components/main';
import Nav from './components/nav';

import { ThemeProvider } from './components/theam-provider';

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="h-screen flex flex-col">
          <Nav />
          <Main/>
          <Footer />
        </main>
      </ThemeProvider>
    </>
  );
}
export default App; 

