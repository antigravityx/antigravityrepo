'use client';
import Head from 'next/head';
import { Box, Typography, Button, Container, Grid, Card } from '@mui/material';

export default function SombrereroStore() {
  return (
    <>
      <Head>
        <title>Sombrerero Náufrago | Premium Bookstore</title>
      </Head>
      <Box sx={{ 
        bgcolor: '#0a0a0a', 
        color: '#ffffff', 
        minHeight: '100vh', 
        fontFamily: '"Helvetica Neue", Arial, sans-serif' 
      }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 700, 
              color: '#c9a56a', 
              letterSpacing: '2px',
              textTransform: 'uppercase',
              mb: 2 
            }}>
              Sombrerero Náufrago
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#a0a0a0', fontStyle: 'italic' }}>
              El conocimiento oculto, revelado.
            </Typography>
          </Box>

          {/* Book Display */}
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={5}>
              <Box sx={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(201, 165, 106, 0.15)',
                border: '1px solid rgba(201, 165, 106, 0.2)',
                transition: 'transform 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 30px 50px rgba(201, 165, 106, 0.25)',
                }
              }}>
                <img 
                  src="/cover1.png" 
                  alt="Crónicas del Orbe" 
                  style={{ width: '100%', display: 'block' }} 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="overline" sx={{ color: '#c9a56a', letterSpacing: '3px' }}>
                  EDICIÓN PREMIUM
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, mb: 3 }}>
                  Crónicas del Orbe
                </Typography>
                <Typography variant="body1" sx={{ color: '#a0a0a0', mb: 4, lineHeight: 1.8 }}>
                  Adéntrate en los secretos del ecosistema Orbe. Este tomo premium contiene los 
                  fundamentos y protocolos para dominar la matriz digital. Una lectura obligatoria 
                  para los iniciados en la arquitectura de la nube y los sistemas autónomos.
                </Typography>
                <Typography variant="h4" sx={{ color: '#c9a56a', fontWeight: 'bold', mb: 4 }}>
                  $24.99 USD
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#c9a56a', 
                    color: '#000', 
                    px: 6, 
                    py: 2, 
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    borderRadius: '30px',
                    '&:hover': {
                      bgcolor: '#d4b37d',
                    }
                  }}
                >
                  Adquirir Ahora
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
