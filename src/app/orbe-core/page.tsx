'use client';
import { useState } from 'react';
import Head from 'next/head';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { IconTerminal2, IconCpu, IconDatabase, IconServer } from '@tabler/icons-react';

export default function OrbeCorePanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput === "PROTOCOLO 247 0nl1n3$$$") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setKeyInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ bgcolor: '#000', color: '#0f0', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
        <Paper elevation={24} sx={{ p: 4, bgcolor: 'rgba(0,20,0,0.9)', border: '1px solid #0f0', maxWidth: 400, width: '100%' }}>
          <Typography variant="h5" sx={{ color: '#0f0', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            ORBE SYSTEM GATEWAY
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              type="password"
              placeholder="ENTER MASTER KEY"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              error={error}
              helperText={error ? "ACCESS DENIED" : ""}
              sx={{
                mb: 3,
                input: { color: '#0f0', fontFamily: 'monospace', textAlign: 'center', letterSpacing: '2px' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: error ? '#f00' : '#0f0' },
                  '&:hover fieldset': { borderColor: '#0f0' },
                  '&.Mui-focused fieldset': { borderColor: '#0f0' },
                },
                '& .MuiFormHelperText-root': { color: '#f00', textAlign: 'center', fontFamily: 'monospace' }
              }}
            />
            <Button fullWidth type="submit" variant="outlined" sx={{ color: '#000', bgcolor: '#0f0', '&:hover': { bgcolor: '#0a0', color: '#000' }, fontWeight: 'bold', fontFamily: 'monospace' }}>
              AUTHENTICATE
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Orbe OS | Core</title>
      </Head>
      <Box sx={{ bgcolor: '#050505', color: '#0f0', minHeight: '100vh', fontFamily: 'monospace', p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6, borderBottom: '1px solid #0f0', pb: 2 }}>
          <IconTerminal2 size={40} stroke={1.5} color="#0f0" />
          <Typography variant="h4" sx={{ ml: 2, fontWeight: 'bold', letterSpacing: '3px' }}>
            ORBE CLOUD OS [VERIX ACTIVE]
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#0a0a0a', border: '1px solid #0f0', color: '#0f0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconServer size={24} />
                <Typography variant="h6" sx={{ ml: 1 }}>Server Node</Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>IP: 82.25.72.122</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Status: ONLINE</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Load: 12%</Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#0a0a0a', border: '1px solid #0f0', color: '#0f0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconDatabase size={24} />
                <Typography variant="h6" sx={{ ml: 1 }}>Matrix DB</Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Host: 212.85.3.230</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Sync: REALTIME</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Integrity: 100%</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, bgcolor: '#0a0a0a', border: '1px solid #0f0', color: '#0f0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconCpu size={24} />
                <Typography variant="h6" sx={{ ml: 1 }}>Verix Soul</Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Protocol: 247</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>CI/CD: LINKED</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Uptime: 99.99%</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3, bgcolor: '#000', border: '1px solid #0f0', color: '#0f0', minHeight: '300px' }}>
              <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.5 }}>TERMINAL OUTPUT</Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                &gt; Orbe OS Initialized.<br/>
                &gt; Awaiting commands from R1ch0n...
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
