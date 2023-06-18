import React from 'react';
import { Button, Divider, Paper, Typography } from '@material-ui/core';

const Complete = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button variant="contained" color="primary" style={{ borderRadius: '50px', marginBottom: '1rem' }}>
        Launch Live Demo
      </Button>
      <Divider style={{ width: '100%' }} />
      <Button variant="contained" color="secondary" style={{ borderRadius: '50px', margin: '1rem 0' }}>
        Open Sandbox
      </Button>
      <Divider style={{ width: '100%' }} />
      <Paper style={{ padding: '1rem', margin: '1rem 0', borderRadius: '5px' }}>
        <Typography variant="body1">&lt;html&gt;&lt;/html&gt;</Typography>
      </Paper>
    </div>
  );
};

export default Complete;
