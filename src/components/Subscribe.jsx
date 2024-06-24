import { Box, InputBase, Divider, Typography, IconButton, Button } from '@mui/material';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const breakPoint = useMediaQuery('(max-width:500px)');

  return (
    <Box className="subscribe">
      <div className="row">
        <div className="col-md-5 col-sm-12 textleft">
          <div>
            <p className="txt">
              <IconButton>
                <MarkEmailReadOutlinedIcon fontSize="medium" style={{ color: '#EF6F1F' }} />
              </IconButton>
              Subscribe To Our Newsletter
            </p>
            <p className="desc">Get all the latest news, upcoming programs, retreats and other updates regularly!</p>
          </div>
        </div>
        <div className="col-md-7 col-sm-12">
          <div className="row">
            <Box
              className="col-5 subscribe-sec"
              p="2px 4px"
              m="15px auto"
              // display="flex"
              alignItems="center"
              // width={breakPoint ? "100%" : "55%"}
              backgroundColor="#F2F2F2">
              <InputBase
                style={{ height: '48px', fontWeight: 'bold', fontSize: '16px', width: '100%' }}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Box>
            <Box
              className="col-7"
              p="2px 4px"
              m="15px auto"
              display="flex"
              alignItems="center"
              width={breakPoint ? '100%' : '52%'}
              backgroundColor="#F2F2F2">
              <InputBase
                style={{ height: '48px', fontWeight: 'bold', fontSize: '16px', width: '100%' }}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <Button style={{ padding: '0' }}>
                {' '}
                <Typography
                  style={{ width: '100px', height: '44px' }}
                  sx={{
                    p: '15px',
                    ':hover': { cursor: 'pointer' },
                    background: '#EF6F1F',
                  }}>
                  Subscribe
                </Typography>
              </Button>
            </Box>
          </div>
          <div style={{ display: 'flex', color: '#FFFFFF', fontSize: '15px' }}>
            <input className="js-form-type-checkbox" type="checkbox" />
            <label htmlFor="edit-join-me-to-whatsapp-group">Join me to WhatsApp group</label>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Subscribe;
