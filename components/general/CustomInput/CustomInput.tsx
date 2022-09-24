import React from "react";

import styles from './CustomInput.module.css';

export type CustomInputProps = {
  label: string
}

export const CustomInput: React.FC<CustomInputProps> = ({ label }) => {
  return (
    <label className={styles.inputGroup}>
      <input
        className={styles.input}
        type="text"
      />
      <span
        className={styles.label}
        data-placeholder="Name"
      >
        {label}
      </span>
    </label>
  );
};