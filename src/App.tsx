import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HeaderComponent from "./component/common/header.component";
import FirstPage from "./page/first.page";
import MainPage from "./page/main.page";

function App() {
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
