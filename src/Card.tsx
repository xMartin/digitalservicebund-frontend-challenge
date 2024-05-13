import { PropsWithChildren, ReactElement } from "react";
import styles from "./Card.module.css";

interface Props {
  title: string;
  actions?: ReactElement;
}

export default function Card({
  children,
  title,
  actions,
}: PropsWithChildren<Props>) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
