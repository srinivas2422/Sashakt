import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Feedback from './components/Feedback';
import Games from './components/Games/Games';
import Video from './components/Videos';
import SlidePuzzle from './components/Games/GL1';
import SlidePuzzle1 from './components/Games/GL2';
import SlidePuzzle2 from './components/Games/GL3';
import SlidePuzzle3 from './components/Games/GL4';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Bot from './Bot/components/Chatbot';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
// import Profile from './components/Profile';
import WaGame from './components/Games/WagaGame/WaGa';
import JumbledSentenceGame from './components/Games/Jumble/Jumblesentence';
// import WordSearchGame from './components/Games/Grid/Grid';
// import WordJumble from './components/Games/JumbleWord/Wordjumble';
import GameBoard from './components/Games/Memory/Memory';
import Video1 from './components/Videos/Video1';
import Video2 from './components/Videos/Video2';
import Video3 from './components/Videos/Video3';
// import QuizComponent1 from './components/Quiz1';
import { UserProvider } from './components/UserContext';
// import Parents from './components/Profile';


function App() {
  return (
    <div className="App">
      <UserProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route exact path='/games' element={<Games/>} />
        <Route exact path='/videos' element={<Video/>} />
        <Route exact path='/feedback' element={<Feedback/>} />
        <Route exact path='/game/level1' element={<SlidePuzzle/>} />
        <Route exact path='/game/level2' element={<SlidePuzzle1/>} />
        <Route exact path='/game/level3' element={<SlidePuzzle2/>} />
        <Route exact path='/game/level4' element={<SlidePuzzle3/>} />
        <Route exact path='/screen1' element={<Screen1/>} />
        <Route exact path='/screen2' element={<Screen2/>} />
        {/* <Route exact path='/profile' element={<Profile/>} /> */}
        <Route exact path='/game/wa' element={<WaGame/>} />
        <Route exact path='/game/jumble' element={<JumbledSentenceGame/>} />
        {/* <Route exact path='/game/grid' element={<WordSearchGame/>} />
        <Route exact path='/game/word' element={<WordJumble/>} /> */}
        <Route exact path='/game/memory' element={<GameBoard/>} />
        <Route exact path='/signin' element={<SignIn/>} />
        <Route exact path='/signup' element={<SignUp/>} />
        <Route exact path='/video1' element={<Video1/>} />
        <Route exact path='/video2' element={<Video2/>} />
        <Route exact path='/video3' element={<Video3/>} />
        <Route exact path='/chat' element={<Bot/>} />
        {/* <Route exact path='/QuizComponent1' element={<QuizComponent1/>} /> */}
        {/* <Route exact path='/parent' element={<Parents/>} />  */}
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

