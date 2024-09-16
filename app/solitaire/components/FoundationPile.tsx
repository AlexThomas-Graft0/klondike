import { Card, CardContent } from "@/components/ui/card";
import { CardType } from "../logic";
import { GameCard } from "./GameCard";

interface FoundationPileProps {
  cards: CardType[];
  suit: string;
  onCardClick: () => void;
}

export function FoundationPile({ cards, suit, onCardClick }: FoundationPileProps) {
  const topCard = cards[cards.length - 1];

  return (
    <Card
      className="w-[100px] h-[150px] bg-green-600 border-2 border-white cursor-pointer"
      onClick={onCardClick}
    >
      <CardContent className="p-2 flex items-center justify-center">
        {topCard ? (
          <GameCard card={topCard} />
        ) : (
          <div className="text-white text-4xl font-bold">{suit}</div>
        )}
      </CardContent>
    </Card>
  );
}