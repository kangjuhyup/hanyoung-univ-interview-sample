import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HeaderComponent from "./component/common/header.component";
import FirstPage from "./page/first.page";
import MainPage from "./page/main.page";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const { ipcRenderer } = window.require("electron");

      const sendMail = () => {
        ipcRenderer.send("ping", "send");
      };

      // 이벤트 리스너 등록
      const handlePong = (event:any, arg:any) => {
        console.log("Main sent a pong!!!");
        // 여기에서 pong 메시지를 처리하거나 필요한 작업을 수행합니다.
        console.log(arg);
      };

      ipcRenderer.on("pong", handlePong);

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
        ipcRenderer.removeListener("pong", handlePong);
      };
    }
  }, []);

  const [start,startHandler] = useState(false);

  return (
    <div className="App">
      <QueryClientProvider client={new QueryClient()}>
        <HeaderComponent />
        {
          !start ?
          <FirstPage startHandler={startHandler}/>
          :
          <MainPage />
        }
        
      </QueryClientProvider>
    </div>
  );
}

export default App;
