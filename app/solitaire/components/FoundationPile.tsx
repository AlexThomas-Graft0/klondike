import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { canMoveToFoundation, CardType } from "../logic";
import { GameCard } from "./GameCard";
import { useDrop, ConnectDropTarget } from "react-dnd";

interface FoundationPileProps {
  cards: CardType[];
  suit: string;
  pileIndex: number;
  onCardMove: (fromPile: number, toPile: number, cardIndex: number) => void;
}

interface DragItem {
  card: CardType;
  index: number;
  pileIndex: number;
}

export function FoundationPile({
  cards,
  suit,
  pileIndex,
  onCardMove,
}: FoundationPileProps) {
  const topCard = cards[cards.length - 1];
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>(() => ({
    accept: "card",
    drop: (item) => {
      onCardMove(item.pileIndex, pileIndex, item.index);
    },
    canDrop: (item) => {
      return canMoveToFoundation(item.card, cards);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [cards, pileIndex, onCardMove]);

  drop(ref);

  return (
    <div
      ref={ref}
      className={`relative ${isOver && canDrop ? "ring-2 ring-blue-500" : ""}`}
    >
      <Card
        className={`w-[100px] h-[150px] ${
          topCard ? "bg-white" : "bg-green-600"
        } border-2 border-white cursor-pointer`}
      >
        <CardContent className="p-2 flex items-center justify-center">
          {topCard ? (
            <GameCard
              card={topCard}
              index={cards.length - 1}
              pileIndex={pileIndex}
            />
          ) : (
            <div className="text-white text-4xl font-bold">{suit}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
