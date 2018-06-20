import React from 'react';

interface ISelectProps {
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface ISelectState {}
class Select extends React.Component<ISelectProps, ISelectState> {
  constructor(props: ISelectProps) {
    super(props);
  }
  render() {
    return (
      <select value={this.props.value} onChange={this.props.handleChange}>
        {this.props.children}
      </select>
    );
  }
}

export default Select;
