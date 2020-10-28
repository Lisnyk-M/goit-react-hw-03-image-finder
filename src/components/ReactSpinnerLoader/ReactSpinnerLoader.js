import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from './ReactSpinnerLoader.module.css';

class ReactSpinnerLoader extends React.Component {
  //other logic
  render() {
    return (
      <Loader className={styles.Loader}
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={0} //3 secs
      />
    );
  }
}

export default ReactSpinnerLoader;