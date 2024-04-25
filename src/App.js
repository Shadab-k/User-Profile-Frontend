import React from "react";
import Routers from "./routes";
import { Provider } from "react-redux";
import persister, { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Routers />
      </PersistGate>
    </Provider>
  );
}

export default App;