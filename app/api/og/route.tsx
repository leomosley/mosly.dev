import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        tw='bg-neutral-900 text-gray-200'
      >
        <div tw='flex flex-col items-center gap-5'>
          <span
            style={{
              fontWeight: "800"
            }}
            tw='text-7xl tracking-tight mb-2'
          >{new URL(process.env.VERCEL_URL ?? "https://mosly.dev").hostname}</span>
          <span
            style={{

            }}
            tw='text-3xl tracking-tight text-neutral-400'
          >portfolio</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}