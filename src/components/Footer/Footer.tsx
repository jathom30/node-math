import React from 'react';
import { FlexBox } from 'components';
import './Footer.scss'

export const Footer = () => {
  return (
    <div className="Footer">
      <a href="https://www.youtube.com/channel/UC73GDN0hsd1DpIEUjpOjoww" target="_blank" rel="noreferrer">
        <FlexBox alignItems="center">
          <YoutubeLogo />
          <span>AJ Thomas Crypto</span>
        </FlexBox>
      </a>
    </div>
  )
}

const YoutubeLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox='0 0 300 300'>
    <path style={{fill:'#fff',fillOpacity: 1}} d="M0 0h400v400H0z" transform="scale(.75)"/>
    <path style={{fill:'red', fillOpacity:1, fillRule:'nonzero', stroke:'none'}} d="M149.938 79.223s-63.22 0-79.086 4.123c-8.496 2.374-15.492 9.37-17.866 17.99-4.123 15.867-4.123 48.727-4.123 48.727s0 32.984 4.123 48.601c2.374 8.62 9.245 15.491 17.866 17.865 15.992 4.248 79.085 4.248 79.085 4.248s63.345 0 79.211-4.123c8.621-2.374 15.492-9.12 17.74-17.865 4.249-15.742 4.249-48.601 4.249-48.601s.125-32.985-4.248-48.852c-2.25-8.62-9.12-15.491-17.74-17.74-15.867-4.373-79.212-4.373-79.212-4.373zm-20.116 40.48 52.6 30.36-52.6 30.234v-60.594z"/>
  </svg>
)