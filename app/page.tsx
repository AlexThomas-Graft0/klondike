"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, RotateCcw } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CardType, createDeck, shuffleDeck, canMoveToFoundation, canMoveToTableau, suits } from "./solitaire/logic";
import { GameCard } from "./solitaire/components/GameCard";
import { TableauPile } from "./solitaire/components/TableauPile";
import { FoundationPile } from "./solitaire/components/FoundationPile";

export default function Home() {
  const [tableauPiles, setTableauPiles] = useState<CardType[][]>(Array(7).fill([]));
  const [foundationPiles, setFoundationPiles] = useState<CardType[][]>(Array(4).fill([]));
  const [stockPile, setStockPile] = useState<CardType[]>([]);
  const [wastePile, setWastePile] = useState<CardType[]>([]);

  const startNewGame = useCallback(() => {
    const newDeck = shuffleDeck(createDeck());
    dealCards(newDeck);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  function dealCards(deck: CardType[]) {
    const newTableauPiles: CardType[][] = Array(7).fill([]).map(() => []);
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        newTableauPiles[j].push({...deck.pop()!, faceUp: i === j});
      }
    }
    setTableauPiles(newTableauPiles);
    setStockPile(deck);
    setWastePile([]);
    setFoundationPiles(Array(4).fill([]));
  }

  function drawCard() {
    if (stockPile.length === 0) {
      setStockPile(wastePile.reverse().map(card => ({...card, faceUp: false})));
      setWastePile([]);
    } else {
      const drawnCard = stockPile.pop()!;
      setWastePile([{...drawnCard, faceUp: true}, ...wastePile]);
      setStockPile([...stockPile]);
    }
  }

  function moveCard(fromPileIndex: number, toPileIndex: number, cardIndex: number) {
    let fromPile: CardType[], setFromPile: (newPile: CardType[]) => void, toPile: CardType[], setToPile: (newPile: CardType[]) => void;

    console.log("Moving card:", { fromPileIndex, toPileIndex, cardIndex });

    if (fromPileIndex === -1) {
      fromPile = [...wastePile];
      setFromPile = setWastePile;
    } else if (fromPileIndex < 7) {
      fromPile = [...tableauPiles[fromPileIndex]];
      setFromPile = (newPile: CardType[]) => {
        const newTableauPiles = [...tableauPiles];
        newTableauPiles[fromPileIndex] = newPile;
        setTableauPiles(newTableauPiles);
      };
    } else {
      fromPile = [...foundationPiles[fromPileIndex - 7]];
      setFromPile = (newPile: CardType[]) => {
        const newFoundationPiles = [...foundationPiles];
        newFoundationPiles[fromPileIndex - 7] = newPile;
        setFoundationPiles(newFoundationPiles);
      };
    }

    if (toPileIndex < 7) {
      toPile = [...tableauPiles[toPileIndex]];
      setToPile = (newPile: CardType[]) => {
        const newTableauPiles = [...tableauPiles];
        newTableauPiles[toPileIndex] = newPile;
        setTableauPiles(newTableauPiles);
      };
    } else {
      toPile = [...foundationPiles[toPileIndex - 7]];
      setToPile = (newPile: CardType[]) => {
        const newFoundationPiles = [...foundationPiles];
        newFoundationPiles[toPileIndex - 7] = newPile;
        setFoundationPiles(newFoundationPiles);
      };
    }

    if (fromPile.length === 0 || cardIndex >= fromPile.length) {
      console.log("Invalid move: Attempting to move from an empty pile or invalid card index");
      return;
    }

    const movingCards = fromPileIndex === -1 ? [fromPile[cardIndex]] : fromPile.slice(cardIndex);
    console.log("Moving cards:", movingCards);
    console.log("To pile:", toPile);

    if (toPileIndex < 7 && canMoveToTableau(movingCards[0], toPile)) {
      setFromPile(fromPileIndex === -1 ? fromPile.filter((_, i) => i !== cardIndex) : fromPile.slice(0, cardIndex));
      setToPile([...toPile, ...movingCards]);
    } else if (toPileIndex >= 7 && movingCards.length === 1 && canMoveToFoundation(movingCards[0], toPile)) {
      setFromPile(fromPileIndex === -1 ? fromPile.filter((_, i) => i !== cardIndex) : fromPile.slice(0, cardIndex));
      setToPile([...toPile, movingCards[0]]);
    } else {
      console.log("Invalid move");
      return; // Don't proceed with the move if it's invalid
    }

    // Flip the top card of the from pile if it's face down
    if (fromPileIndex < 7 && cardIndex > 0 && fromPile[cardIndex - 1] && !fromPile[cardIndex - 1].faceUp) {
      const newFromPile = [...fromPile.slice(0, cardIndex)];
      newFromPile[cardIndex - 1] = {
        ...newFromPile[cardIndex - 1],
        faceUp: true,
      };
      setFromPile(newFromPile);
    }
  }

  function handleDoubleClick(card: CardType, fromPileIndex: number, cardIndex: number) {
    // Check if it's an ace and can be moved to a foundation pile
    if (card.value === 'A') {
      const foundationIndex = suits.indexOf(card.suit);
      if (foundationPiles[foundationIndex].length === 0) {
        moveCard(fromPileIndex, foundationIndex + 7, cardIndex);
        return;
      }
    }

    // Check if it can be moved to a foundation pile
    const foundationIndex = suits.indexOf(card.suit);
    if (canMoveToFoundation(card, foundationPiles[foundationIndex])) {
      moveCard(fromPileIndex, foundationIndex + 7, cardIndex);
      return;
    }

    // Check if it can be moved to a tableau pile
    for (let i = 0; i < 7; i++) {
      if (i !== fromPileIndex && canMoveToTableau(card, tableauPiles[i])) {
        moveCard(fromPileIndex, i, cardIndex);
        return;
      }
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-green-800 p-4 flex flex-col">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Klondike Solitaire</h1>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={startNewGame}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              New Game
            </Button>
            <Button variant="secondary" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Undo
            </Button>
          </div>
        </header>

        <div className="flex gap-4 mb-4">
          <GameCard card={{ suit: '♠', value: '', faceUp: false }} index={-1} pileIndex={-2} onClick={drawCard} />
          <GameCard card={wastePile[0] || { suit: '♠', value: '', faceUp: false }} index={0} pileIndex={-1} />
          <div className="flex-grow" />
          {foundationPiles.map((pile, index) => (
            <FoundationPile
              key={index}
              cards={pile}
              suit={['♠', '♥', '♦', '♣'][index]}
              pileIndex={index + 7}
              onCardMove={moveCard}
            />
          ))}
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {tableauPiles.map((pile, index) => (
            <TableauPile
              key={index}
              cards={pile}
              pileIndex={index}
              onCardMove={moveCard}
              onDoubleClick={handleDoubleClick}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
