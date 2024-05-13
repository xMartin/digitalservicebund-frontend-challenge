import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

interface Props {
  title: string;
}

export default function Card({ children, title }: PropsWithChildren<Props>) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
