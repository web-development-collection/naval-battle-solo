import React, {Component} from 'react';
import Board from "./components/Board";
import "./css/Game.css";
import Tile from "./components/Tile";



class App extends Component<any, any> {

  public state: any = {
    item: "Wave",
    playing: false,
    won: false,
  }


  public onWin = () => {
    // alert("You win!!!");
    this.setState(() => ({playing: false, won: true}));
  }



  public render() {
    const fireworkSrc = "https://i2.wp.com/thewisdomofthepenis.com/wp-content/uploads/2017/01/Fireworks-Animated-Gif-Transparent.gif";

    return <div className="App">

      {this.state.won && <>
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
      </>}

      <div className={"Select"}>
        {/* todo: Render as list */}
        <Tile
          onClick={() => this.setState(() => ({item: "Wave"}))}
          className={`SelectBox ${this.state.item === "Wave" && "Selected"}`}
          locked={false}
          type={"Wave"}/>

        <Tile
          onClick={() => this.setState(() => ({item: "Boat"}))}
          className={`SelectBox ${this.state.item === "Boat" && "Selected"}`}
          locked={false}
          type={"Boat"}/>

        <Tile
          onClick={() => this.setState(() => ({item: "Empty"}))}
          className={`SelectBox ${this.state.item === "Empty" && "Selected"}`}
          locked={false}
          type={"Empty"}/>
      </div>

      <Board
        playing={this.state.playing}
        type={this.state.item}
        onWin={this.onWin}
      />

      <button
        className={"Play Button" + ` ${this.state.playing && "Playing"}`}
        onClick={() => {
          if (this.state.playing)
            return;

          this.setState(() => ({playing: true, won: false}));
        }}
        children={this.state.playing ? "Playing..." : "Play"}
      />

    </div>;
  }
}

export default App;
