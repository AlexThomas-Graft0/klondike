import { Card, CardContent } from "@/components/ui/card";
import { CardType } from "../logic";

interface GameCardProps {
  card: CardType;
  onClick?: () => void;
}

export function GameCard({ card, onClick }: GameCardProps) {
  const { suit, value, faceUp } = card;
  const isRed = suit === '♥' || suit === '♦';

  return (
    <Card
      className={`w-[100px] h-[150px] ${faceUp ? 'bg-white' : 'bg-green-700'} border-2 border-white cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="p-2 flex items-center justify-center">
        {faceUp ? (
          <span className={`text-2xl font-bold ${isRed ? 'text-red-500' : 'text-black'}`}>
            {value}{suit}
          </span>
        ) : (
          <img src="/placeholder.svg?height=150&width=100" alt="Card back" className="w-full h-full object-cover" />
        )}
      </CardContent>
    </Card>
  );
}