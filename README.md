# React Wordle Game

## Overview
This project is a Wordle-like game built using **React**, **TypeScript**, and **CSS**. The game allows users to input a word, check if it's valid using a dictionary, and provides visual feedback based on whether the word exists or not. The UI structure is inspired by the classic Wordle game interface.

## Features
- **Word Entry:** Click on the alphabet keys to fill in word squares.
- **Backspace:** Remove the last character entered.
- **Enter Validation:** Validate the entered word against an English dictionary.
- **Visual Feedback:** Green border for correct words, red border for incorrect words or incomplete words.

## Project Structure

The project consists of two main parts:

### Part 1: ActionListener Class
The `MyActionListener` class is designed to manage actions in a listener-based system. It allows registering listeners for specific actions, emitting those actions with data, and removing listeners when no longer needed.

#### Methods:
1. **registerListener(action: string, listener: Function):** Registers a listener for a specific action. If the action already exists, the new listener will be added to the list.
2. **removeListener(action: string):** Removes all listeners associated with the given action.
3. **emit(action: string, data: any):** Emits the specified action with the provided data. If no listeners are registered for the action, an exception is thrown.

### Example Usage:
```typescript
// Creating an instance of MyActionListener
const actionListener = new MyActionListener();

// Registering listeners for the "PRINT" action
actionListener.registerListener("PRINT", (data) =>
  console.log(`Don't tell me what I ${data} or ${data}'t do`)
);
actionListener.registerListener("PRINT", (data) =>
  console.log(`I eat pickles right off the ${data}`)
);

// Emitting the "PRINT" action
actionListener.emit("PRINT", "Can");

// Removing listeners for the "PRINT" action
actionListener.removeListener("PRINT");

// Emitting an unregistered action (will throw error)
actionListener.emit("PRINT", "Can");
