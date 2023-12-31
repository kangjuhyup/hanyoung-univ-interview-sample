import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Floating from "./component/common/floating.button";
import HeaderComponent from "./component/common/header.component";
import FirstPage from "./page/first.page";
import MainPage from "./page/main.page";
import dbStore, { Data } from "./store/db.store";

function App() {
  const [isInit,setInit] = useState(false);
  const [start,startHandler] = useState(false);

  const {setDatabase,setData} = dbStore();

  useEffect(() => {
    if(process.env.NODE_ENV === 'production') {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.on('admin-ready',(evnet:any) => {        
        setDatabase();
        ipcRenderer.send('selectAll');
        ipcRenderer.once('selectAllResponse',(event:any,response:{success:boolean,data:Data[]}) => {
          setData(response.data);
          setInit(true);
        })
      })
    }
  },[])

  return (
    <div className="App">
      <QueryClientProvider client={new QueryClient()}>
        <HeaderComponent />
        {
          !start?
          <FirstPage isInit={isInit} startHandler={startHandler}/>
          :
          <MainPage />
        }
        {
          isInit?
          <Floating>+</Floating>
          :
          <></>
        }
        
      </QueryClientProvider>
    </div>
  );
}

export default App;
