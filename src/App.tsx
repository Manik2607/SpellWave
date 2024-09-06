
import './App.css'
import Footer from './components/footer';
import Input from './components/input';
import Nav from './components/nav';
import Settings from './components/settings';
import { ThemeProvider } from './components/theam-provider';

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="h-screen flex flex-col">
          <Nav />
          <Settings />
          <Input maxLength={8} />
          <Footer />
        </main>
      </ThemeProvider>
    </>
  );
}
export default App; 

