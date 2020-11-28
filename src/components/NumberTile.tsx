import React, {Component} from 'react';


class NumberTile extends Component<any, any> {

  public render() {
    return <div className={"Number Tile"}>
      {this.props.number}
    </div>;
  }
}

export default NumberTile;