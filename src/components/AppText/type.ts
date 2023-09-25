export default interface PropTypes {
  flex?: boolean;
  flexShrink?: boolean;
  flexGrow?: boolean;
  color?: string;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  justify?: boolean;
  padding?: number;
  margin?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  lineHeight?: number;
  size?: number;
  fontWeight?: string;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  children?: JSX.Element | JSX.Element[] | string | any;
  animated?: boolean;
  style?: any;
  maxWidth?: string | number;
  numberOfLines?: number;
  onPress?: any;
}
