import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CardType } from "../logic";
import { useDrag } from 'react-dnd';
import Image from 'next/image';
import cardBackImage from '@/public/cardback.png';

interface GameCardProps {
  card: CardType;
  index: number;
  pileIndex: number;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export function GameCard({ card, index, pileIndex, onClick, onDoubleClick }: GameCardProps) {
  const { suit, value, faceUp } = card;
  const isRed = suit === '♥' || suit === '♦';
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { card, index, pileIndex },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [card, index, pileIndex]);

  drag(ref);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card
        className={`w-[100px] h-[150px] ${faceUp ? 'bg-white' : 'bg-green-700'} border-2 border-white cursor-pointer`}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <CardContent className={`flex items-center justify-center ${faceUp ? 'p-2' : 'p-0'}`}>
          {faceUp ? (
            <span className={`text-2xl font-bold ${isRed ? 'text-red-500' : 'text-black'}`}>
              {value}{suit}
            </span>
          ) : (
            <Image src={cardBackImage.src} alt="Card back" width={100} height={150} className="object-cover rounded-lg" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}