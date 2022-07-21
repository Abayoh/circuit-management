import React from 'react';
import Box from '@mui/system/Box';
import { responsiveMargin } from '../commonStyles';
import FooterNavSection from './FooterNavSection';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const Footer = () => {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gridRowGap: 8,
        gridColumnGap: { sm: 4, md: 6, lg: 8 },
        pt: 7,
        pb: { xs: 10, md: 4 },
        minHeight: '250px',
        ...responsiveMargin,
      }}
    >
      <FooterNavSection sectionHeader='Get to Know Us'>
        <a>About</a>
        <a>Careers</a>
        <a>Blog</a>
      </FooterNavSection>
      <FooterNavSection sectionHeader='Customer Care'>
        <a>Help Center</a>
        <a>How to Buy</a>
        <a>Track Your Order</a>
        <a>Corporate & Bulk Purchasing</a>
        <a>Track Your Order</a>
      </FooterNavSection>
      <FooterNavSection
        sectionHeader='Contact Us'
        sx={{
          '&>li': {
            color: '#AEB4BE',
            ml: 1,
            lineHeight: '24px',
            listStyle: 'none',
          },
        }}
      >
        <li> Libtelco Compound </li>
        <li> Broad & Lynch Streets</li>
        <li>Monrovia, Liberia</li>
        <li>Phone: +231886255993</li>
        <li>Email: alexander@hotmail.com</li>
        <Box sx={{ '&>svg': { mr: 1 }, pl: 1 }}>
          <FacebookIcon />
          <InstagramIcon />
          <Twitter />
          <GoogleIcon />
        </Box>
      </FooterNavSection>
      <FooterNavSection sectionHeader='Get to Know Us'>
        <a>About</a>
        <a>Careers</a>
        <a>Blog</a>
      </FooterNavSection>
    </Box>
  );
};

export default Footer;
