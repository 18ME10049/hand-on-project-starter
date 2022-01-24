import React  from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Cards from '../../components/Cards/Cards';
import { useState } from 'react';
import photo from "./photo.svg";

function DashBoardPage() {
  
  const [cards, setcards] = useState([
    {
      id: 1,
      image: photo,
      name: "Background remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 2,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 3,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 4,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 5,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 6,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 7,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 8,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
    {
      id: 9,
      image: photo,
      name: "Backgroud remover",
      description: "Api that can remove your photo Background",
    },
  ]);

    return (
      <div>
        <Navbar />
        <Cards cards={cards}/>
      </div>
    );
}

DashBoardPage.prototype={};

export default DashBoardPage;