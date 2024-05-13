import Datasets from "./Datasets";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>GovData Dashboard</h1>
      </header>
      <Datasets />
    </div>
  );
}

export default App;
