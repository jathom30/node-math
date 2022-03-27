import React from 'react';
import { FlexBox } from 'components';
import banner from 'assets/aj_thomas_site_logo.png'
import desktopAd from 'assets/nodeWhale.png'
import mobileAd from 'assets/nodeWhaleWide.png'
import './Footer.scss'
import { GridBox } from 'components/Box';

export const Footer = ({isMobile}: {isMobile: boolean}) => {
  return (
    <div className="Footer">
      <FlexBox flexDirection='column' gap=".5rem">
        <a className='Footer__ad-link' href="https://nodewhales.com/" target="_blank" rel="noreferrer">
        {!isMobile ? (
            <>
              <img className='Footer__ad' src={desktopAd} alt="node whale ad" />
              <img className='Footer__ad' src={desktopAd} alt="node whale ad" />
              <img className='Footer__ad' src={desktopAd} alt="node whale ad" />
            </>
        ) : (
          <img className='Footer__ad' src={mobileAd} alt="node whale ad" />
          )}
          </a>
        <FlexBox gap='1rem' alignItems="center" justifyContent="space-between">
          <span className='Footer__text'><strong>These are not guaranteed rewards.</strong> Please do your own research and invest at your own risk. This is not financial advice.</span>
          <a href="https://www.youtube.com/channel/UC73GDN0hsd1DpIEUjpOjoww" target="_blank" rel="noreferrer">
            <FlexBox alignItems="center">
              {isMobile ? (
                <>
                  <YoutubeLogo />
                  <span className='Footer__text'>AJ Thomas Crypto</span>
                </>
              ) : (
                <img className='Footer__aj' src={banner} alt="AJ Thomas Crypto Youtube" />
              )}
            </FlexBox>
          </a>
        </FlexBox>
      </FlexBox>
    </div>
  )
}

const YoutubeLogo = () => (
  <svg className='YoutubeLogo' xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox='0 0 300 300'>
    <path style={{fill:'red', fillOpacity:1, fillRule:'nonzero', stroke:'none'}} d="M149.938 79.223s-63.22 0-79.086 4.123c-8.496 2.374-15.492 9.37-17.866 17.99-4.123 15.867-4.123 48.727-4.123 48.727s0 32.984 4.123 48.601c2.374 8.62 9.245 15.491 17.866 17.865 15.992 4.248 79.085 4.248 79.085 4.248s63.345 0 79.211-4.123c8.621-2.374 15.492-9.12 17.74-17.865 4.249-15.742 4.249-48.601 4.249-48.601s.125-32.985-4.248-48.852c-2.25-8.62-9.12-15.491-17.74-17.74-15.867-4.373-79.212-4.373-79.212-4.373zm-20.116 40.48 52.6 30.36-52.6 30.234v-60.594z"/>
  </svg>
)