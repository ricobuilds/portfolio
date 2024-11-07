import { cn } from '@/lib/shared-utils';
import { GeistSans } from 'geist/font/sans';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
  const font = fetch(
    new URL('@/public/fonts/CalSans-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        tw='border'
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundRepeat: 'no-repeat',
          fontStyle: "normal",
          fontWeight: 800,
          backgroundSize: 'cover',
          backgroundImage: `url(${process.env.NODE_ENV === 'development' ? 'https://enrictrillo.com' : 'http://localhost:3001'}/dynamic-og.png)`,
        }}
      >
        <div
          tw='ml-18 text-center'
          style={{
            display: 'flex',
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: 52,
            fontFamily: 'CalSans-Semibold',
            color: 'white',
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'CalSans',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}