import React from 'react';

interface IButtonProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IButtonState {

}
class Button extends React.Component<IButtonProps, IButtonState> {

  constructor (props: IButtonProps) {
    super(props);
  }
  render() {
    return (
      <button onClick={this.props.handleClick}>{this.props.children}</button>
    );
  }
}

export default Button;
