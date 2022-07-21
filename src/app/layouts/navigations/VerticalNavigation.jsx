import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import Box from '@mui/system/Box';
import ButtomBase from '@mui/material/ButtonBase';

// const styles = (theme) => ({
//   expandIcon: {
//     transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
//     transform: 'rotate(90deg)',
//   },
//   collapseIcon: {
//     transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
//     transform: 'rotate(0deg)',
//   },
// });

const navigationStyle = (open) => ({
  '& .nav-item': {
    position: 'relative',
    display: 'flex',
    padding: 1,
    height: '48px',
    overflow: 'hidden',
    textDecoration: 'none',
    alignItems: 'center',
    justifyContent: `${open ? 'space-bewteen' : 'center'}`,
    color: 'text.secondary',
    '&.active': {
      color: 'primary.main',
      '&:after': {
        position: 'absolute',
        content: '""',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'primary.main',
        width: '4px',
      },
    },

    '&:hover': {
      backgroundColor: 'action.hover',
    },
    '& .item-text': {
      fontSize: '16px',
      ml: 2,
    },
    '& .mx-auto': {
      mx: 'auto',
    },

    '&> button': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .icon-text ': {
      ml: '4px',
      fontSize: '10px',
      textIndent: 0,
      left: 0,
      '&:after': {
        display: 'none',
      },
    },
  },
  mt: 4,
});

const VerticalNavigation = ({ navigations, open }) => {
  const matched = useMatch('/customers');
  const renderLevels = (data) => {
    return data.map((item, index) => {
      return (
        <NavLink
          key={index}
          end
          to={item.path || item.navPath}
          className={(prop) => {
            const { isActive } = prop;

            return isActive ? 'nav-item active' : 'nav-item';
          }}
        >
          <ButtomBase key={item.name} name='child' className='w-full'>
            {(() => {
              if (item.icon) {
                return <Icon sx={{ pr: 2 }}>{item.icon}</Icon>;
              } else {
                return <span>{item.iconText}</span>;
              }
            })()}
            {open && (
              <>
                <span className='item-text'>{item.name}</span>
                <div className='mx-auto'></div>
                {item.badge && (
                  <div className={`badge bg-${item.badge.color}`}>
                    {item.badge.value}
                  </div>
                )}
              </>
            )}
          </ButtomBase>
        </NavLink>
      );
    });
  };

  return (
    <Box sx={{ ...navigationStyle(open) }}>{renderLevels(navigations)}</Box>
  );
};

export default VerticalNavigation;
