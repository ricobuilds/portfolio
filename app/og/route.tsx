import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
  const font = fetch(
    new URL('../../public/fonts/CalSans-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url(${process.env.NODE_ENV === 'production' ? 'https://enrictrillo.com' : 'http://localhost:3000'}/og-bg.png)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            maxWidth: "720px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            fontSize: 64,
            fontFamily: 'CalSans-Semibold',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
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
          name: 'Kaisei Tokumin',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}