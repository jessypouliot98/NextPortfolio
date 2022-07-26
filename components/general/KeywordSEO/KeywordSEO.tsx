import React from "react";
import styles from './KeywordSEO.module.css';

export type KeywordSEOProps = {
  keywords: string[],
}

export const KeywordSEO: React.FC<KeywordSEOProps> = ({ keywords }) => {
  return (
    <div className={styles.keywords}>
      <ul>
        {keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
      </ul>
    </div>
  )
}
