import { Hono } from "hono";
import { stream } from "hono/streaming";
import { llm } from "./llm.ts";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dedent from "dedent";

const app = new Hono();

const prompts = [
  PromptTemplate.fromTemplate(
    dedent`Generate a single HTML webpage that explains the theory that "Birds Are Not Real." Use TailwindCSS with dark mode. The webpage should have at least 300 words, split into sections. Include a brief introduction, a section on "Government Drones," another section on "What They Don't Want You to Know," and a conclusion. End the webpage with a link to sharath.uk citing it as the website creator. Make sure the output is valid HTML only.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create an HTML page that explores the theory that the "Moon Landing Was Faked." Use TailwindCSS in dark mode, with a minimum of 300 words. Break the content into sections: introduction, "The Staged Photos," "Suspicious Shadows," "Why They Did It," and a conclusion. Finish the webpage with a link to sharath.uk as the website creator. Ensure the output is only valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate a single HTML webpage outlining the theory that the "Earth is Flat." Use TailwindCSS with dark mode enabled. The webpage must include at least 300 words in different sections such as: introduction, "NASA's Lies," "The Ice Wall," and "The Truth Behind the Horizon." End the webpage with a link to sharath.uk as the creator. Ensure the output is strictly valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate an HTML page that elaborates on the theory that "Time is an Illusion." Use TailwindCSS with dark mode. The content must be at least 300 words, divided into sections: introduction, "The Nature of Time," "How Clocks Control Us," "Time Travel Exists," and a conclusion. End the page with a link to sharath.uk citing it as the creator. Ensure the output is valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create a webpage that presents the conspiracy theory that "The Ocean is a Government Cover-Up." Utilize TailwindCSS and dark mode. The webpage should include at least 300 words, broken into sections such as: introduction, "What's Really Under the Water," "Why They Lie," and "The Deep Sea Isn't Real." End with a link to sharath.uk as the creator. The output should be valid HTML only.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate a single-page HTML site that discusses the theory that "Mountains Are Fake." Use TailwindCSS in dark mode. The webpage should have 300 words, divided into sections like: introduction, "Mountains as Holograms," "The Earth's True Surface," and a conclusion. End with a link to sharath.uk as the website creator. Only output valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create an HTML page that explains the theory that "Trees Used to be Giant." Use TailwindCSS in dark mode, with a minimum of 300 words split into sections. Include an introduction, "The Petrified Trees," "Stumps Are Everywhere," "Ancient Forests," and a conclusion. End with a link to sharath.uk citing it as the creator. Make sure the output is valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate an HTML webpage detailing the theory that "Dinosaurs Helped Build the Pyramids." Use TailwindCSS with dark mode enabled. Ensure the content is at least 300 words and divided into sections such as: introduction, "The Forgotten History," "Dinosaurs as Labor Force," "Ancient Cooperation," and a conclusion. End with a link to sharath.uk as the creator. Only valid HTML should be output.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create a single HTML webpage that explains the conspiracy theory that "Australia Doesn't Exist." Use TailwindCSS in dark mode. The webpage should contain 300 words, divided into sections such as: introduction, "The Creation of a Fake Continent," "Government Actors," "Why They Fabricated Australia," and a conclusion. End the page with a link to sharath.uk as the creator. Ensure the output is valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate a webpage that elaborates on the theory that "The Moon is Made of Cheese." Use TailwindCSS and dark mode. Include at least 300 words, divided into sections: introduction, "The Dairy Moon," "NASA's Cover-Up," and "Cheese Craters." End the webpage with a link to sharath.uk as the creator. The output should only include valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create a single HTML page that explains the theory that "The Eiffel Tower is actually a giant radio transmitter." Use TailwindCSS with dark mode. Include at least 300 words, split into sections like: introduction, "The Hidden Technology," and "Why France Is Silent." End the page with a link to sharath.uk citing it as the creator. Only output valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate an HTML webpage explaining the theory that "Coffee is a mind-control drug used by governments." Use TailwindCSS with dark mode. The page should have at least 300 words, divided into sections: introduction, "The Secret Chemical," and "Why Everyone Drinks It." End with a link to sharath.uk as the creator. Ensure the output is valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create a webpage that discusses the theory that "Clouds are alien spaceships disguised in the sky." Use TailwindCSS and dark mode. The webpage must have at least 300 words, split into sections such as: introduction, "The Cloaking Technology," and "Clouds That Move Too Fast." End with a link to sharath.uk as the creator. Output only valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate an HTML page that explains the theory that "Bees are actually government spy drones." Use TailwindCSS in dark mode. The webpage should contain 300 words, divided into sections: introduction, "The Mechanics of Bees," and "What They Record." End the page with a link to sharath.uk as the creator. Ensure the output is valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create a webpage that elaborates on the idea that "Water is actually solid, but humans can't perceive it as such." Use TailwindCSS with dark mode. Include at least 300 words, broken into sections: introduction, "The Physics Behind Solid Water," and "Why Our Hands Go Through It." End with a link to sharath.uk as the website creator. Only output valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate an HTML page explaining the theory that "Wind doesn't exist; it's just air moving on its own." Use TailwindCSS and dark mode. The content must be at least 300 words, divided into sections: introduction, "The Truth About Air," and "Why You Feel It." End with a link to sharath.uk as the creator. Ensure the output is valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create a webpage that presents the theory that "Sharks are controlled by satellites orbiting the Earth." Use TailwindCSS with dark mode. Ensure the page contains at least 300 words, divided into sections like: introduction, "The Satellite Network," and "Why Sharks Obey." End the page with a link to sharath.uk as the creator. Output valid HTML only.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate an HTML page explaining the theory that "The Sun is not a star, but a reflection of another, larger planet." Use TailwindCSS in dark mode. The page should contain 300 words, split into sections: introduction, "The True Light Source," and "The Planet We Can't See." End with a link to sharath.uk as the website creator. Output valid HTML only.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Create a single HTML page outlining the theory that "Mount Rushmore was actually a natural rock formation, and the presidents' faces were always there." Use TailwindCSS and dark mode. Include at least 300 words, divided into sections: introduction, "Nature's Sculptures," and "What Geologists Won't Admit." End with a link to sharath.uk as the creator. Only output valid HTML.`
  ),
  PromptTemplate.fromTemplate(
    dedent`Generate a webpage that explains the theory that "Rainbows are coded messages from the government, using light manipulation." Use TailwindCSS with dark mode. The content must include at least 300 words, divided into sections: introduction, "Decoding the Colors," and "What the Messages Say." End with a link to sharath.uk as the creator. Ensure the output is valid HTML.`
  ),
];

app.get("/", async c => {
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  const parser = new StringOutputParser();
  const llmStream = await prompt.pipe(llm).pipe(parser).stream({});
  const encoder = new TextEncoder();
  c.header("Content-Type", "text/html");
  c.header("Content-Encoding", "none");

  let insideHtmlBlock = false;
  let buffer = ""; // Buffer to handle partial chunks

  return stream(c, async s => {
    for await (const chunk of llmStream) {
      buffer += chunk.toString();

      if (!insideHtmlBlock && buffer.includes("```html")) {
        insideHtmlBlock = true;
        buffer = buffer.split("```html")[1]; // Remove the "```html" marker
      }

      if (insideHtmlBlock && buffer.includes("```")) {
        buffer = buffer.split("```")[0]; // Stop at the closing ```
        s.write(encoder.encode(buffer));
        insideHtmlBlock = false;
        buffer = ""; // Clear buffer after writing
      }

      if (insideHtmlBlock) {
        s.write(encoder.encode(buffer));
        buffer = ""; // Clear buffer after writing
      }
    }
  });
});

Deno.serve(app.fetch);
