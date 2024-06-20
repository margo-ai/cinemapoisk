import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from "./components/ui/Container";
import { Header } from "./components/Header";

import { MainPage } from "./pages/MainPage";
import { SingleMoviePage } from "./pages/SingleMoviePage";

export const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Header>Cinemapoisk</Header>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:movieId" element={<SingleMoviePage />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Container>
  );
};
