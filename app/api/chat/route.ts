import authService from "@/actions/auth/auth.service";
import { streaming_api } from "@/lib/api";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { message, chatId } = await req.json();
    const user = await authService.currentUser();
    const headers = {
      headers: {
        "Bevor-User-Identifier": user?.user_id,
      },
    };

    // Create a new ReadableStream for streaming the response
    const stream = new ReadableStream({
      async start(controller: ReadableStreamDefaultController): Promise<void> {
        try {
          // Make the API request to your backend
          const response = await streaming_api.post(
            `/chat/${chatId}`,
            {
              message,
            },
            headers,
          );

          // Get the response as a stream
          // Axios with responseType: 'stream' provides the data directly as a stream
          const dataStream = response.data;

          // Process the stream
          for await (const chunk of dataStream) {
            // Send the chunk to the client
            controller.enqueue(chunk);
          }

          // Close the stream when done
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    // Return the stream with appropriate headers
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
