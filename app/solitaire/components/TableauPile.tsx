import { CardType } from "../logic";
import { GameCard } from "./GameCard";

interface TableauPileProps {
  cards: CardType[];
  onCardClick: (index: number) => void;
}

export function TableauPile({ cards, onCardClick }: TableauPileProps) {
  return (
    <div className="flex flex-col items-center">
      {cards.map((card, index) => (
        <div key={index} className="-mt-20 first:mt-0" style={{ zIndex: index }}>
          <GameCard card={card} onClick={() => onCardClick(index)} />
        </div>
      ))}
    </div>
  );
}