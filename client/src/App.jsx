import { Logs } from "./Logs.jsx";
import { LogProvider } from "./context/LogContext.jsx";
import { Navigation } from "./components/Navigation.jsx";
import { Search } from "./containers/Search.jsx";
import { Card } from "./components/Card.jsx";

function App() {
  return (
    <LogProvider>
      <Navigation />
      <div class="container mx-auto">
        <div class="my-4">
          <Search />
        </div>
        <Card>
          <Logs />
        </Card>
      </div>
    </LogProvider>
  );
}

export default App;
