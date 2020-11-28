import React, {Component, CSSProperties} from 'react';
import Tile from "./Tile";
import NumberTile from "./NumberTile";


const size = 10;
const sizeSquared = size * size;
const boatLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const show = [5 /* waves */, 4 /* boats */];


class Board extends Component<any, any> {

  // State
  public state: any = {
    visibleBoard: [],
    board: [],

    bottomRow: [],
    rightCol: [],
  };


  // Generators
  public generateBoats() {
    let board = Array.from({length: sizeSquared}, () => ({}));

    boatLengths.forEach((boatLength: number) => {

      const maxBoatLengthIndex = size - boatLength;
      const maxBoatWidthIndex = size - 1;

      let direction = Math.random() < 0.5;

      let startLengthIndex = Math.floor(Math.random() * maxBoatLengthIndex);
      let startWidthIndex = Math.floor(Math.random() * maxBoatWidthIndex);

      let i = 0;
      const retries = 50;
      while (!this.canPlaceBoat(direction, startLengthIndex, startWidthIndex, boatLength, board) && i < retries) {
        console.log("RETRY");
        direction = Math.random() < 0.5;

        startLengthIndex = Math.floor(Math.random() * maxBoatLengthIndex);
        startWidthIndex = Math.floor(Math.random() * maxBoatWidthIndex);

        i++;
      }

      board = this.placeBoat(direction, startLengthIndex, startWidthIndex, boatLength, board);
      board = this.surroundWithWater(board);

    });

    return this.fillWithWater(board);
  }

  public canPlaceBoat(direction: boolean, il: number, iw: number, length: number, board: Array<any>): boolean {
    if (direction) {
      // [x x x x]
      for (let i = 0; i < length; ++i) {
        const index = size * iw + il + i;
        const tile = board[index];

        if (tile) {
          if (tile?.type === "Boat" || tile?.type === "Wave") {
            return false;
          }
        }
      }
    }
    else {
      // [x]
      // [x]
      // [x]
      // [x]
      for (let i = 0; i < length; ++i) {
        const index = (i + il) * size + iw;
        const tile = board[index];

        if (tile) {
          if (tile?.type === "Boat" || tile?.type === "Wave") {
            return false;
          }
        }
      }
    }

    return true;
  }

  public placeBoat(direction: boolean, il: number, iw: number, length: number, board: Array<any>) {
    let extra = {};
    if (direction) {
      // [x x x x]
      for (let i = 0; i < length; ++i) {

        extra = {};

        if (i === 0) {
          extra = {
            leftTopCorner: true,
            leftBottomCorner: true,
            ...extra,
          };
        }

        if (i === length - 1) {
          extra = {
            rightTopCorner: true,
            rightBottomCorner: true,
            ...extra,
          };
        }

        const index = size * iw + il + i;

        board[index] = {
          type: "Boat",
          ...extra,
        };
      }
    }
    else {
      // [x]
      // [x]
      // [x]
      // [x]
      for (let i = 0; i < length; ++i) {
        const index = (i + il) * size + iw;

        extra = {};

        if (i === 0) {
          extra = {
            leftTopCorner: true,
            rightTopCorner: true,
            ...extra,
          };
        }

        if (i === length - 1) {
          extra = {
            leftBottomCorner: true,
            rightBottomCorner: true,
            ...extra,
          };
        }

        board[index] = {
          type: "Boat",
          ...extra,
        };
      }
    }

    return board;
  }

  public surroundWithWater(board: Array<any>) {
    const aroundIndexes = [-1, 0, 1];

    board.forEach((item: any, index: number) => {
      if (item?.type === "Boat") {

        const row = Math.floor(index / size);
        const col = index - (row * size);

        for (let rIndex of aroundIndexes) {
          for (let cIndex of aroundIndexes) {

            const waveRow = row + rIndex;
            const waveCol = col + cIndex;

            // In bounds?
            if (waveRow < size && waveCol < size) {
              const boardIndex = waveRow * size + waveCol;

              if (board[boardIndex] && board[boardIndex]?.type !== "Boat") {
                board[boardIndex] = {
                  type: "Wave",
                }
              }
            }

          }
        }
      }
    });

    return board;
  }

  public fillWithWater(board: Array<any>) {
    return board.map((item: any) => {
      if (!item?.type) {
        return {
            ...item,
            type: "Wave",
        };
      }

      return item;
    })
  }


  // Show?
  public getRandomBoats(array: Array<any>) {
    const boats: any[] = [];
    const randomBoats: any[] = [];

    array.forEach((element: any, index: number) => {
      if (element?.type === "Boat") {
        boats.push({
          ...element,
          index,
        });
      }
    });

    const [, boatShowCount] = show;

    for (let i = 0; i < boatShowCount; i++) {
      const randomBoatIndex = Math.floor(Math.random() * boats.length);
      const randomBoat = boats.splice(randomBoatIndex, 1)[0]
      randomBoats.push(randomBoat);
    }

    return randomBoats;
  }

  public getRandomWaves(array: Array<any>) {
    const waves: any[] = [];
    const randomWaves: any[] = [];

    array.forEach((element: any, index: number) => {
      if (element?.type === "Wave") {
        waves.push({
          ...element,
          index,
        });
      }
    });

    const [waveShowCount] = show;

    for (let i = 0; i < waveShowCount; i++) {
      const randomWaveIndex = Math.floor(Math.random() * waves.length);
      const randomWave = waves.splice(randomWaveIndex, 1)[0]
      randomWaves.push(randomWave);
    }

    return randomWaves;
  }


  // Rows & Cols
  public generateBottomRow(board: Array<any>) {
    const col: any[] = [];

    for (let i = 0; i < size; ++i) {
      const iCol = this.getCol(i, board);
      const count = this.countBoats(iCol);

      col.push({number: count});
    }

    return col;
  }

  public generateRightCol(board: Array<any>) {
    const row: any[] = [];

    for (let i = 0; i < size; ++i) {
      const iRow = this.getRow(i, board);
      const count = this.countBoats(iRow);

      row.push({number: count});
    }

    return row;
  }

  public countBoats(array: Array<any>) {
    let count = 0;

    array.forEach((item: any) => {
      if (item?.type === "Boat")
        count++;
    });

    return count;
  }

  public getRow(index: number, array: Array<any>) {
    const row = [];

    for (let i = 0; i < size; i++) {
      row.push(array[size * index + i]);
    }

    return row;
  }

  public getCol(index: number, array: Array<any>) {
    const col = [];

    for (let i = 0; i < size; i++) {
      col.push(array[size * i + index]);
    }

    return col;
  }


  // Lifecycle methods
  public componentDidMount() {
    this.setState(() => ({
      visibleBoard: Array.from({length: sizeSquared}, () => ({})),
      bottomRow: Array.from({length: size}, () => ({number: 0})),
      rightCol: Array.from({length: size}, () => ({number: 0})),
    }));
  }

  public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        const board = this.generateBoats();
        const bottomRow = this.generateBottomRow(board);
        const rightCol = this.generateRightCol(board);
        const visibleBoard = this.generateVisibleBoard(board);

        console.log(board);

        this.setState(() => ({
          board,
          visibleBoard,
          bottomRow,
          rightCol,
        }));
      }
    }
  }


  // Init
  public generateVisibleBoard(board: Array<any>) {
    const boats = this.getRandomBoats(board);
    const waves = this.getRandomWaves(board);

    const generatedBoard = Array.from({length: sizeSquared}, () => ({
      type: "Empty",
      locked: false,
    }));

    boats.forEach((item: any) => {
      generatedBoard[item.index] = {
        ...item,
        type: "Boat",
        locked: true,
      };
    });

    waves.forEach(({index}: any) => {
      generatedBoard[index] = {
        type: "Wave",
        locked: true,
      };
    });

    return generatedBoard;
  }


  public isGameValid(visibleBoard: Array<any>): boolean {

    const board = this.state.board;

    for (let i = 0; i < sizeSquared; i++) {

      const boardElement = board[i];
      const visibleBoardElement = visibleBoard[i];

      if (boardElement?.type !== visibleBoardElement?.type) {
        return false;
      }
    }

    return true;
  }


  // Listeners
  public onTileClick = (index: number) => {
    if (!this.props.playing)
      return;

    const updatedVisibleBoard = this.state.visibleBoard.map((e: any, i: number) => {
      if (i === index) {
        return {
          ...e,
          type: this.props.type,
        }
      }

      return e;
    });

    this.setState(() => ({visibleBoard: updatedVisibleBoard}));

    if (this.isGameValid(updatedVisibleBoard)) {
      this.props.onWin();
      return;
    }
  }


  // Rendering
  public render() {

    const { visibleBoard, bottomRow, rightCol } = this.state;

    return <div className={"Board"} style={{gridTemplateColumns: `repeat(${size + 1}, 1fr)`}}>

      {visibleBoard.map((tile: any, index: number) => {

        const items = [];

        items.push(<Tile
          style={{
            borderBottomLeftRadius: tile.leftBottomCorner ? 30 : 4,
            borderBottomRightRadius: tile.rightBottomCorner ? 30 : 4,
            borderTopLeftRadius: tile.leftTopCorner ? 30 : 4,
            borderTopRightRadius: tile.rightTopCorner ? 30 : 4,
          } as CSSProperties}
          onClick={() => { this.onTileClick(index) }}
          index={index}
          type={tile?.type ? tile?.type : "Empty"}
          locked={tile.locked ? tile.locked : false}
          key={index}
        />);

        if (index % size === size - 1) {
          const numberColIndex = ((index + 1) / size) - 1;
          const numberTile = rightCol[numberColIndex];

          items.push(<NumberTile
            key={sizeSquared + index}
            number={numberTile.number}
          />);
        }

        return items;
      })}

      {bottomRow.map((tile: any, index: number) => {
        return <NumberTile
          key={index}
          number={tile.number}
        />;
      })}
    </div>;
  }
}

export default Board;