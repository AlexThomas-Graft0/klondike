import { CardType, canMoveToTableau } from "../logic";
import { GameCard } from "./GameCard";
import { useDrop } from 'react-dnd';

interface TableauPileProps {
  cards: CardType[];
  pileIndex: number;
  onCardMove: (fromPile: number, toPile: number, cardIndex: number) => void;
  onDoubleClick: (card: CardType, pileIndex: number, cardIndex: number) => void;
}

export function TableauPile({ cards, pileIndex, onCardMove, onDoubleClick }: TableauPileProps) {
  const [, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { card: CardType; index: number; pileIndex: number }) => {
      onCardMove(item.pileIndex, pileIndex, item.index);
    },
    canDrop: (item: { card: CardType }) => {
      return canMoveToTableau(item.card, cards);
    },
  }), [cards, pileIndex, onCardMove]);

  return (
    <div ref={drop} className="flex flex-col items-center">
      {cards.map((card, index) => (
        <div key={index} className="-mt-20 first:mt-0" style={{ zIndex: index }}>
          <GameCard
            card={card}
            index={index}
            pileIndex={pileIndex}
            onDoubleClick={() => onDoubleClick(card, pileIndex, index)}
          />
        </div>
      ))}
    </div>
  );
}