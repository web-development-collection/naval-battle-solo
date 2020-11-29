

/**
 * class Array2D
 * @author Ingo Andelhofs
 */
class Array2D<T> {
  private readonly data: Array<Array<T>>;
  private readonly rows: number;
  private readonly cols: number;


  /**
   * Constructor
   * @param rows The amount of rows
   * @param cols The amount of cols
   * @param fill The default value for the 2D Array
   */
  public constructor(rows: number, cols: number, fill: T) {
    this.rows = rows;
    this.cols = cols;

    this.data = new Array(rows).fill(fill).map(() => new Array(cols).fill(fill))
  }


  /**
   * Set a value of the 2D Array
   * @param row The row index
   * @param col The col index
   * @param val The value you want to set
   */
  public set(row: number, col: number, val: T): void {
    this.data[row][col] = val;
  }


  /**
   * Get the value of an element in the 2D Array
   * @param row The row index
   * @param col The col index
   */
  public get(row: number, col: number): T {
    return this.data[row][col];
  }


  /**
   * Get a row of the 2D Array
   * @param row The row index
   */
  public getRow(row: number): Array<T> {
    return this.data[row];
  }


  /**
   * Get a col of the 2D Array
   * @param col The col index
   */
  public getCol(col: number): Array<T> {
    const colBuffer: Array<T> = [];

    for (let i = 0; i < this.rows; ++i)
      colBuffer.push(this.data[i][col]);

    return colBuffer;
  }


  /**
   * Create a copy of the 2D Array
   */
  public copy(): Array<Array<T>> {
    const copyBuffer: Array<Array<T>> = [];

    for(let i = 0; i < this.rows; ++i) {
      const rowCopy = [...this.getRow(i)];
      copyBuffer.push(rowCopy);
    }

    return copyBuffer;
  }


  /**
   * Returns true if the indexes are in bounds, otherwise false
   * @param row The row index
   * @param col The col index
   */
  public inBounds(row: number, col: number): boolean {
    return row < this.rows && row >= 0 && col < this.cols && col >= 0;
  }
}


export default Array2D;