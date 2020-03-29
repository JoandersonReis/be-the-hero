import React from 'react';
import "intl"
import "intl/locale-data/jsonp/pt-BR"
import { YellowBox } from "react-native"

import Routes from "./src/routes"

YellowBox.ignoreWarnings(["Failed child context type"])

export default function App() {
  return (
    <>
      <Routes />
    </>
  );
}

