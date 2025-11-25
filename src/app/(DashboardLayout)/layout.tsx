"use client";
import { styled, Container, Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('@/app/(DashboardLayout)/layout/header/CartDrawer'), {
  ssr: false,
});
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import Footer from "./layout/footer/page";
import AuthGuard from "@/components/auth/AuthGuard";
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/theme/darkTheme';
import { CartProvider } from '@/contexts/CartContext';

const MainWrapper = styled("div")(() => ({
  // display: "flex",
  // minHeight: "100vh",
  // width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const theme = useTheme();
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthGuard>
        <CartProvider>
          <MainWrapper className="mainwrapper">

            {/* ------------------------------------------- */}
            {/* Header */}
            {/* ------------------------------------------- */}
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
            <CartDrawer />

            {/* ------------------------------------------- */}
            {/* page Wrapper */}
            {/* ------------------------------------------- */}
            <PageWrapper className="page-wrapper"
              sx={{
                [theme.breakpoints.up("lg")]: {
                  ml: `270px`,
                },
              }}
            >

              {/* ------------------------------------------- */}
              {/* Sidebar */}
              {/* ------------------------------------------- */}
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
              />

              {/* ------------------------------------------- */}
              {/* PageContent */}
              {/* ------------------------------------------- */}
              <Container
                sx={{
                  paddingTop: "20px",
                  maxWidth: "1200px",
                }}
              >
                {/* ------------------------------------------- */}
                {/* Page Route */}
                {/* ------------------------------------------- */}
                <Box mt={4} sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
                {/* ------------------------------------------- */}
                {/* End Page */}
                {/* ------------------------------------------- */}

                {/* ------------------------------------------- */}
                {/* Footer */}
                {/* ------------------------------------------- */}
                <Footer />
              </Container>
            </PageWrapper>
          </MainWrapper>
        </CartProvider>
      </AuthGuard>
    </ThemeProvider>
  );
}
