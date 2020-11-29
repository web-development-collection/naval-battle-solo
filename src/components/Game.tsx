import React, {Component} from 'react';
import Tile from "./Tile";
import Board from "./Board";


// Constants
const fireworkSrc = "https://i2.wp.com/thewisdomofthepenis.com/wp-content/uploads/2017/01/Fireworks-Animated-Gif-Transparent.gif";


// Types
export type Item = "Wave" | "Boat" | "Empty";


/**
 * interface State
 * @author Ingo Andelhofs
 */
interface State {
  item: Item;
  playing: boolean;
  won: boolean;

  resetToggle: boolean;
  clearToggle: boolean;
  tipToggle: boolean;
}


/**
 * component Game
 * @author Ingo Andelhofs
 */
class Game extends Component<any, State> {

  // State
  public state: State = {
    item: "Wave",
    playing: false,
    won: false,

    resetToggle: true,
    clearToggle: true,
    tipToggle: true,
  }


  // Listeners
  public onWin = () => {
    this.setState(() => ({playing: false, won: true}));
  }

  public onPlay = () => {
    if (this.state.playing)
      return;

    this.setState(() => ({playing: true, won: false}));
  }


  // Rendering
  public renderFireworks() {
    return <>
      <img
        className={"Firework"}
        src={fireworkSrc}
        alt={"Fireworks"}
      />

      <img
        className={"Firework Right"}
        src={fireworkSrc}
        alt={"Fireworks"}
      />
    </>;
  }

  public renderSelectOptions() {
    const options: Array<{ item: Item }> = [
      {item: "Wave"},
      {item: "Boat"},
      {item: "Empty"},
    ];


    const setItem = (item: Item) => {
      this.setState(() => ({item}));
    }


    return <div className={"Select"}>

      {options.map((option: { item: Item }) => {
        const {item} = option;

        return <Tile
          key={item}
          onClick={() => setItem(item)}
          className={`SelectBox ${this.state.item === item && "Selected"}`}
          locked={false}
          type={item}
        />
      })}

    </div>
  }

  public renderBoard() {
    return <Board
      clearToggle={this.state.clearToggle}
      resetToggle={this.state.resetToggle}
      tipToggle={this.state.tipToggle}

      playing={this.state.playing}
      type={this.state.item}
      onWin={this.onWin}
    />;
  }

  public renderButtons() {
    return <div className="ButtonGroup">
      <button
        className={`Play Button ${this.state.playing && "Playing"}`}
        onClick={this.onPlay}
        children={this.state.playing ? "Playing..." : "Play"}
      />

      {this.state.playing && <>
        <button
          className={`Button`}
          onClick={() => this.setState((s: State) => ({resetToggle: !s.resetToggle}))}
          children={"Reset"}
        />

        <button
          className={`Button`}
          onClick={() => this.setState((s: State) => ({clearToggle: !s.clearToggle}))}
          children={"Clear"}
        />

        <button
          className={`Button`}
          onClick={() => this.setState((s: State) => ({tipToggle: !s.tipToggle}))}
          children={"Tip"}
        />
      </>}
    </div>
  }

  public render() {
    return <div className="Game">

      {this.state.won && this.renderFireworks()}

      {this.renderSelectOptions()}

      {this.renderBoard()}

      {this.renderButtons()}

    </div>
  }
}

export default Game;