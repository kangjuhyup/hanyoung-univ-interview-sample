import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HeaderComponent from './component/common/header.component';
import MainPage from './page/main.page';

function App() {
  const { ipcRenderer } = window.require("electron"); 
  const sendMail = () => { 
    ipcRenderer.send('ping', 'send'); 
  } 

  useEffect(() => {
    // 이벤트 리스너 등록
    ipcRenderer.on('pong', (event:any, arg:any) => {
      console.log('Main sent a pong!!!');
      // 여기에서 pong 메시지를 처리하거나 필요한 작업을 수행합니다.
      console.log(arg)
    });
  
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
      ipcRenderer.removeAllListeners('pong');
    };
  }, []);
  

  return (
    <div className="App">
      <QueryClientProvider client={new QueryClient}>

        <HeaderComponent/>
      <MainPage/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
