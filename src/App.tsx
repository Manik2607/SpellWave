
import './App.css'
import Footer from './components/footer';

import Main from './components/main';
import Nav from './components/nav';
// import TabTest from './components/TabTest';

import { ThemeProvider } from './components/ui/theam-provider';

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="h-screen flex flex-col">
          <Nav />
          <Main/>
          <Footer />  
        </main>
        {/* <TabTest/> */}
      </ThemeProvider>
    </>
  );
}
export default App; 

