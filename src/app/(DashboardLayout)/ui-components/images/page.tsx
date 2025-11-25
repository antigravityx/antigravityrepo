'use client';
import { Grid, ImageList, ImageListItem, Paper } from "@mui/material";
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
// import Image from "next/image";

// Commented out missing images
// import img1 from "public/images/backgrounds/blog-img2.jpg";
// import img2 from "public/images/backgrounds/blog-img3.jpg";
// import img3 from "public/images/backgrounds/blog-img4.jpg";
// import img4 from "public/images/backgrounds/blog-img5.jpg";
// import img5 from "public/images/backgrounds/blog-img6.jpg";
// import img6 from "public/images/backgrounds/blog-img10.jpg";
// import img7 from "public/images/backgrounds/blog-img1.jpg";
const itemData: any[] = [];

const Images = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Grid Image">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Image gallery temporarily disabled - missing image files
          </div>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Images;
