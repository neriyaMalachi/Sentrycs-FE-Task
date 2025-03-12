type Listener<T> = (data: T) => void;

export class ActionListener<T> {
  private listeners: Map<number, Listener<T>> = new Map();
  private idCounter = 0;

  

  // רישום מאזין חדש ומחזיר מזהה
  addListener(listener: Listener<T>): number {
    console.log("Adding listener");
    const id = this.idCounter++;
    this.listeners.set(id, listener);
    return id;
  }

  // הפעלת כל המאזינים לאירוע מסוים
  emit(data: T): void {
    console.log("Emitting data");

    this.listeners.forEach((listener) => listener(data));
  }

  // הסרת מאזין לפי מזהה
  removeListener(id: number): void {
    console.log("Removing listener");
    this.listeners.delete(id);
  }
}
