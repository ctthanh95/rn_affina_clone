export default interface PropTypes {
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
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  radius?: number;
  height?: number | string;
  width?: number | string;
  square?: number;
  backgroundColor?: string;
  shadow?: boolean;
  shadowColor?: string;
  elevation?: number;
  children?: JSX.Element | JSX.Element[] | string | any;
  style?: any;
  center?: boolean;
  row?: boolean;
  column?: boolean;
  middle?: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  wrap?: boolean;
  spaceAround?: boolean;
  spaceEvenly?: boolean;
  flex?: number | boolean;
  space?: 'between| around|evenly';
  absolute?: boolean;
  relative?: boolean;
  zIndex?: number;
  flexShrink?: number;
  flexGrow?: number | boolean;
  alignStart?: boolean;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  alignCenter?: boolean;
  alignEnd?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyCenter?: boolean;
  justifySpaceAround?: boolean;
  justifySpaceBetween?: boolean;
  justifySpaceEvenly?: boolean;
  justifyAround?: boolean;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  borderWidth?: number;
  borderColor?: string;
  circle?: number;
  opacity?: number;
  maxWidth?: number | false | string | 'none';
  maxHeight?: number | false | string | 'none';
  overflow?: 'visible' | 'hidden' | 'scroll';
  borderRightWidth?: number | string;
  borderBottomWidth?: number;
  absoluteFull?: boolean;
  radiusTop?: number;
  radiusBottom?: number;
  isPaddingAndroid?: boolean;
  isPaddingIos?: boolean;
  borderTopWidth?: number;
  borderLeftWidth?: number;
}
