# Solitaire Game TODO List

## Bugs and Fixes
1. Review and fix card moving logic between piles
   - Ensure it follows the rules in @rules.txt
   - Check that cards can only be placed on opposite color and next-higher rank
   - Verify that only kings can be placed on empty tableau piles

2. Implement proper handling of face-down cards
   - Use @cardback.png for face-down cards
   - Ensure the top card of each tableau pile is face-up at the start
   - Flip the next card when a face-up card is moved from a tableau pile

3. Fix foundation pile logic
   - Ensure only aces can be placed on empty foundation piles
   - Verify that cards can only be placed in ascending order of the same suit

## New Features
1. Implement double-click functionality for available moves
   - Double-clicking an ace should move it to the correct foundation pile
   - Double-clicking a card should move it to a valid tableau pile if possible
   - If a card can be moved to a foundation pile, double-click should move it there

2. Add undo functionality
   - Implement the "Undo" button to revert the last move

3. Implement proper stock pile and waste pile handling
   - Allow drawing three cards at a time from the stock pile
   - Implement recycling of the waste pile when the stock pile is empty

## Improvements
1. Add visual feedback for valid drop targets when dragging a card

2. Implement a scoring system

3. Add animations for card movements

4. Create a game-over detection and victory screen

5. Implement a timer and move counter

6. Add sound effects for card movements and game events

7. Create a settings menu for customizing game options (e.g., draw one or three cards)

8. Implement a hint system to suggest possible moves

9. Add keyboard shortcuts for common actions (e.g., 'R' for new game, 'U' for undo)

10. Optimize performance for smoother gameplay on various devices