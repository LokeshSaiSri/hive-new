export type EventQuestionType = "text" | "dropdown";

export type EventQuestion = {
  id: string;
  label: string;
  type: EventQuestionType;
  required: boolean;
  options: string[];
};

export type EventDescriptionLink = {
  label: string;
  url: string;
};

export type RegistrationAnswer = {
  questionId: string;
  label: string;
  value: string;
};

function newId() {
  return crypto.randomUUID();
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function sanitizeQuestions(input: unknown): EventQuestion[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const questions: EventQuestion[] = [];

  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const raw = item as Record<string, unknown>;
    const label = typeof raw.label === "string" ? raw.label.trim().slice(0, 120) : "";
    if (!label) continue;
    const type: EventQuestionType = raw.type === "dropdown" ? "dropdown" : "text";
    let id = typeof raw.id === "string" ? raw.id.trim().slice(0, 80) : "";
    if (!id || seen.has(id)) id = newId();
    seen.add(id);
    const options =
      type === "dropdown" && Array.isArray(raw.options)
        ? raw.options
            .filter((option): option is string => typeof option === "string")
            .map((option) => option.trim().slice(0, 80))
            .filter(Boolean)
            .slice(0, 30)
        : [];
    if (type === "dropdown" && options.length === 0) continue;
    questions.push({
      id,
      label,
      type,
      required: raw.required === true,
      options,
    });
    if (questions.length >= 20) break;
  }

  return questions;
}

export function sanitizeDescriptionLinks(input: unknown): EventDescriptionLink[] {
  if (!Array.isArray(input)) return [];
  const links: EventDescriptionLink[] = [];

  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const raw = item as Record<string, unknown>;
    const label = typeof raw.label === "string" ? raw.label.trim().slice(0, 80) : "";
    const url = typeof raw.url === "string" ? raw.url.trim().slice(0, 500) : "";
    if (!label || !isHttpUrl(url)) continue;
    links.push({ label, url });
    if (links.length >= 8) break;
  }

  return links;
}

export function collectAnswers(
  questions: EventQuestion[],
  raw: unknown,
): { ok: true; answers: RegistrationAnswer[] } | { ok: false; error: string } {
  const byId = new Map<string, string>();
  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const entry = item as Record<string, unknown>;
      const questionId = typeof entry.questionId === "string" ? entry.questionId : "";
      const value = typeof entry.value === "string" ? entry.value.trim().slice(0, 500) : "";
      if (questionId) byId.set(questionId, value);
    }
  }

  const answers: RegistrationAnswer[] = [];
  for (const question of questions) {
    const value = byId.get(question.id) ?? "";
    if (question.required && !value) {
      return { ok: false, error: `${question.label} is required` };
    }
    if (question.type === "dropdown" && value && !question.options.includes(value)) {
      return { ok: false, error: `Choose a valid option for ${question.label}` };
    }
    if (value) {
      answers.push({ questionId: question.id, label: question.label, value });
    }
  }

  return { ok: true, answers };
}
