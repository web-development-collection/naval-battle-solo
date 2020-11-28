import React, {Component} from 'react';


interface Props {
  type: "Wave" | "Boat" | "Empty",
  locked: boolean,
  boatType?: number,
  className?: string,
  style?: any,
  index?: number,
  onClick?: (e: any) => void,
}


class Tile extends Component<Props, any> {

  private onClick = (e: any) => {
    if (this.props.locked)
      return;

    if (this.props.onClick) {
      this.props.onClick!(e);
    }
  }

  public render() {
    const { style, type, locked, className } = this.props;

    const options = {
      "Wave": <i className={`Wave ${locked && "Lock"} fas fa-water`} />,
      "Boat": <div style={style} className={`Boat ${locked && "Lock"}`} />,
      "Empty": null, // <p children={this.props.index} />,
    };

    return <div className={`Water Tile ${className && className}`} onClick={this.onClick}>
      {options[type]}
    </div>;
  }
}

export default Tile;