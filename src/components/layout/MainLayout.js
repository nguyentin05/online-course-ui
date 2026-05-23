import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ChatWindow from '../chat/ChatWindow';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex-grow"><Outlet /></div>
    <Footer />
    <ChatWindow />
  </div>
);

export default MainLayout;