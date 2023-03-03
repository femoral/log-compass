import { Logs } from "./Logs.jsx";
import { LogProvider } from "./context/LogContext.jsx";
import { Search } from "./containers/Search.jsx";
import { Card } from "./components/Card.jsx";
import { SideMenu } from "./containers/Sidemenu.jsx";
import { Main } from "./containers/Main.jsx";

function App() {
  return (
    <LogProvider>
      <SideMenu />
      <Main>
        <Card class={"grow"}>
          <div class="my-4">
            <Search />
          </div>
          <Logs />
        </Card>
      </Main>
    </LogProvider>
  );
}

export default App;
