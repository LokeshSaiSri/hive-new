type FellowshipSectionLabelProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";
};

export function FellowshipSectionLabel({
  children,
  tone = "dark",
}: FellowshipSectionLabelProps) {
  return (
    <p
      className={`fellowship-label ${tone === "light" ? "fellowship-label--light" : ""}`}
    >
      <span className="fellowship-label__bar" aria-hidden />
      {children}
    </p>
  );
}
