import { Hono } from "hono";
import { stream } from "hono/streaming";

const app = new Hono();

app.get("/", (c) => {
  console.log(c.req.url);
  const naturalsGenerator = naturals(10000);
  const readableStream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await naturalsGenerator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(new TextEncoder().encode(value));
      }
    },
  });
  c.header("Content-Encoding", "none");
  return stream(c, (s) => s.pipe(readableStream));
});

async function* naturals(n: number) {
  let i = 1;
  while (i++ <= n) {
    await new Promise((r) => setTimeout(r, 1000 / 144));
    yield i.toString();
  }
}

Deno.serve(app.fetch);
