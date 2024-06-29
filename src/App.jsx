/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App () {

  const [active, setActive] = useState("Home");

  return (
    // eslint-disable-next-line no-undef
      <BrowserRouter>
        <main className="w-full h-[100vh] bg-yellow-100 flex flex-row justify-center items-center">
          Hello World!
        </main>
      </BrowserRouter>
  )
}

export default App

