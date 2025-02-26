// app/api/events/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: { message: string }) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Send initial event
      sendEvent({ message: 'Connected to SSE' });

      // Send event every 2 seconds
      const intervalId = setInterval(() => {
        sendEvent({ message: `Current time: ${new Date().toLocaleTimeString()}` });
      }, 1000);

      request.signal.addEventListener("abort", () => {
        clearInterval(intervalId);
        console.log("Client disconnected");
        controller.close();
      });
    },
    cancel() {
      console.log('Stream cancelled');
    }
  });

  return new NextResponse(response, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}