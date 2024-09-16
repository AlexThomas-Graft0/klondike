export type SuitType = '♠' | '♥' | '♦' | '♣';
export type CardType = { suit: SuitType; value: string; faceUp: boolean };

const suits: SuitType[] = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function createDeck(): CardType[] {
  return suits.flatMap(suit => 
    values.map(value => ({ suit, value, faceUp: false }))
  );
}

export function shuffleDeck(deck: CardType[]): CardType[] {
  return [...deck].sort(() => Math.random() - 0.5);
}

export function canMoveToFoundation(card: CardType, foundationPile: CardType[]) {
  if (foundationPile.length === 0) {
    return card.value === 'A';
  }
  const topCard = foundationPile[foundationPile.length - 1];
  return card.suit === topCard.suit && values.indexOf(card.value) === values.indexOf(topCard.value) + 1;
}

export function canMoveToTableau(card: CardType | undefined, tableauPile: CardType[]) {
  if (!card) {
    console.error("Attempted to move undefined card");
    return false;
  }
  if (tableauPile.length === 0) {
    return card.value === 'K';
  }
  const topCard = tableauPile[tableauPile.length - 1];
  const isOppositeColor = (card.suit === '♥' || card.suit === '♦') !== (topCard.suit === '♥' || topCard.suit === '♦');
  return isOppositeColor && values.indexOf(card.value) === values.indexOf(topCard.value) - 1;
}