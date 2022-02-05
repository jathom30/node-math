import { StandardLonghandProperties } from 'csstype'
import React from 'react'
import './Box.scss'
import { createStyles, createClassNames } from './helpers'

type CommonBoxType = {
  paddingLeft?: StandardLonghandProperties['paddingLeft']
  paddingRight?: StandardLonghandProperties['paddingRight']
  paddingBottom?: StandardLonghandProperties['paddingBottom']
  paddingTop?: StandardLonghandProperties['paddingTop']
  padding?: string
  backgroundColor?: string
  textAlign?: StandardLonghandProperties['textAlign']
  flexGrow?: StandardLonghandProperties['flexGrow']
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
  UNSAFE_style?: { [key: string]: any }
  UNSAFE_className?: string
}

type FlexBoxType = {
  gap?: string
  alignItems?: StandardLonghandProperties['alignItems']
  alignSelf?: StandardLonghandProperties['alignSelf']
  alignContent?: StandardLonghandProperties['alignContent']
  justifyItems?: StandardLonghandProperties['justifyItems']
  justifySelf?: StandardLonghandProperties['justifySelf']
  justifyContent?: StandardLonghandProperties['justifyContent']
  flexDirection?: StandardLonghandProperties['flexDirection']
  flexWrap?: StandardLonghandProperties['flexWrap']
}

type GridBoxType = {
  gap?: string
  gridTemplateColumns?: StandardLonghandProperties['gridTemplateColumns']
  gridTemplateAreas?: StandardLonghandProperties['gridTemplateAreas']
  gridTemplateRows?: StandardLonghandProperties['gridTemplateRows']
  alignItems?: StandardLonghandProperties['alignItems']
  alignSelf?: StandardLonghandProperties['alignSelf']
  alignContent?: StandardLonghandProperties['alignContent']
  justifyItems?: StandardLonghandProperties['justifyItems']
  justifySelf?: StandardLonghandProperties['justifySelf']
  justifyContent?: StandardLonghandProperties['justifyContent']
}

type BoxType = {
  display?: 'flex' | 'grid'
} & CommonBoxType &
  (FlexBoxType | GridBoxType)

export const Box: React.FC<BoxType> = (props) => {
  const { UNSAFE_className, UNSAFE_style } = props

  const nonStyleProps = ['children', 'UNSAFE_className', 'UNSAFE_style', 'size']

  const classNameProps = [
    'display',
    'alignItems',
    'alignSelf',
    'alignContent',
    'justifyItems',
    'justifySelf',
    'justifyContent',
    'flexDirection',
    'flexWrap',
    'textAlign',
  ]

  const style = createStyles(
    props,
    [...nonStyleProps, ...classNameProps],
    UNSAFE_style,
  )
  const classNames = createClassNames(
    'Box',
    classNameProps,
    props,
    UNSAFE_className,
  )

  return (
    <div className={classNames} style={style}>
      {props.children}
    </div>
  )
}

export const FlexBox: React.FC<FlexBoxType & CommonBoxType> = (props) => (
  <Box display="flex" {...props}>
    {props.children}
  </Box>
)

export const GridBox: React.FC<GridBoxType & CommonBoxType> = (props) => (
  <Box display="grid" {...props}>
    {props.children}
  </Box>
)
