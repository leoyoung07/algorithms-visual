type CallbackAction<T> = (element: T | undefined, elements: Array<T>) => void;
class Queue<T> {
  private _queue: Array<T>;
  constructor(
    private afterEnqueue?: CallbackAction<T>,
    private afterDequeue?: CallbackAction<T>
  ) {
    this._queue = [];
  }

  /**
   * Enqueue
   * @param {T} element
   * @returns void
   */
  public Enqueue(element: T) {
    this._queue.push(element);
    if (this.afterEnqueue) {
      this.afterEnqueue(element, this._queue);
    }
  }

  /**
   * Dequeue
   * @returns T | undefined
   */
  public Dequeue(): T | undefined {
    const element = this._queue.shift();
    if (this.afterDequeue) {
      this.afterDequeue(element, this._queue);
    }
    return element;
  }
}

export { Queue };
