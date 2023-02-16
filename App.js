import { Provider } from "react-redux";

// Redux Store
import { store } from "./src/redux/store";

// Components
import Main from "./src/Components/Main/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
