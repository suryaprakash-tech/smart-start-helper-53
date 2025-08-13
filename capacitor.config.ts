import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.888feea92d0d4251812822cf389f1d9c',
  appName: 'TechGuide Senior',
  webDir: 'dist',
  server: {
    url: 'https://888feea9-2d0d-4251-8128-22cf389f1d9c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ["camera"]
    }
  }
};

export default config;