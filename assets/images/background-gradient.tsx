export const getBackgroundGradient = (code: number, hour: number) => {
    const isDay = hour >= 6 && hour < 18;

    switch (code) {
        // First time open the app
        case -1:
            return [
                'rgba(135, 206, 235, 0.9)',
                'rgba(111, 184, 245, 0.9)',
                'rgba(79, 170, 240, 0.9)'
            ] as const;
        // Clear sky
        case 0:
            return isDay
                ? [
                    'rgba(135,206,235,0.95)',
                    'rgba(100,185,245,0.92)',
                    'rgba(80,170,240,0.9)'
                ] as const
                : [
                    'rgba(30,50,95,0.95)',
                    'rgba(20,35,70,0.95)',
                    'rgba(10,20,40,0.95)'
                ] as const;

        // Partly cloudy
        case 1: case 2: case 3:
            return isDay
                ? [
                    'rgba(200,220,240,0.95)',
                    'rgba(170,200,225,0.92)',
                    'rgba(140,175,205,0.9)'
                ] as const
                : [
                    'rgba(70,95,130,0.95)',
                    'rgba(50,70,100,0.95)',
                    'rgba(30,45,70,0.95)'
                ] as const;

        // Foggy
        case 45: case 48:
            return isDay
                ? [
                    'rgba(220,225,230,0.95)',
                    'rgba(200,205,210,0.92)',
                    'rgba(160,170,180,0.9)'
                ] as const
                : [
                    'rgba(110,115,125,0.95)',
                    'rgba(80,85,95,0.95)',
                    'rgba(55,60,70,0.95)'
                ] as const;

        // Drizzle
        case 51: case 53: case 55:
            return isDay
                ? [
                    'rgba(170,195,215,0.95)',
                    'rgba(150,175,200,0.92)',
                    'rgba(110,135,165,0.9)'
                ] as const
                : [
                    'rgba(75,100,130,0.95)',
                    'rgba(55,75,100,0.95)',
                    'rgba(35,50,70,0.95)'
                ] as const;

        // Rain
        case 61: case 63: case 65: case 80: case 81: case 82:
            return isDay
                ? [
                    'rgba(140,170,205,0.95)',
                    'rgba(120,150,185,0.95)',
                    'rgba(80,110,145,0.95)'
                ] as const
                : [
                    'rgba(60,85,120,0.95)',
                    'rgba(40,60,85,0.95)',
                    'rgba(25,40,60,0.95)'
                ] as const;

        // Snow fall
        case 71: case 73: case 75: case 85: case 86:
            return isDay
                ? [
                    'rgba(250,252,255,0.95)',
                    'rgba(240,245,250,0.95)',
                    'rgba(210,225,240,0.9)'
                ] as const
                : [
                    'rgba(150,165,185,0.95)',
                    'rgba(120,135,155,0.95)',
                    'rgba(90,105,125,0.95)'
                ] as const;

        // Thunderstorm
        case 95: case 96: case 99:
            return isDay
                ? [
                    'rgba(110,130,165,0.95)',
                    'rgba(90,110,140,0.95)',
                    'rgba(50,70,95,0.95)'
                ] as const
                : [
                    'rgba(35,50,80,0.95)',
                    'rgba(20,30,50,0.95)',
                    'rgba(10,15,30,0.95)'
                ] as const;

        default:
            return ['rgba(70,90,115,0.95)',
                'rgba(45,60,80,0.95)',
                'rgba(25,35,50,0.95)'
            ] as const;
    }
};