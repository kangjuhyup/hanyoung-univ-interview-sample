import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Floating from "./component/common/floating.button";
import HeaderComponent from "./component/common/header.component";
import FirstPage from "./page/first.page";
import MainPage from "./page/main.page";
import dbStore from "./store/db.store";

function App() {
  const [start,startHandler] = useState(false);

  const {setDatabase} = dbStore();

  useEffect(() => {
    if(process.env.NODE_ENV === 'production') {
      const { ipcRenderer } = window.require('elctron');
      ipcRenderer.on('database-ready',(evnet:any,db:any) => {
        setDatabase(db);
      })
    }
  },[])

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
        <Floating>+</Floating>
      </QueryClientProvider>
    </div>
  );
}

export default App;
