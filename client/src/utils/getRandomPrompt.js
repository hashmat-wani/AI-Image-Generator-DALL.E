import { surpriseMePrompts } from "../constants/surpriseme";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  // to avoid coming same random promps
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}


