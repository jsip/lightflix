import React from "react";
import styles from "../../styles/Home.module.scss";

const EmbeddedYT = ({ embeddedKey }) => {
  return (
    <div className={styles.responsiveEmbed}>
      <iframe
        width="267"
        height="150"
        src={`https://www.youtube.com/embed/${embeddedKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default EmbeddedYT;
