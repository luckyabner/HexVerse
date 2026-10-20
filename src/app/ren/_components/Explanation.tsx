import { LIUSHEN_EXPLANATIONS } from "../_lib/constants";
import { SectionLabel } from "@/components/design/SectionLabel";

const LEAD: Record<string, string> = {
  大安: "身不动时",
  留连: "人未归时",
  速喜: "人即至时",
  赤口: "官事凶时",
  小吉: "人来喜时",
  空亡: "音信稀时",
};

export default function Explanation() {
  return (
    <section>
      <SectionLabel index="参">六神释义</SectionLabel>

      <div className="mt-8 border-t border-border">
        {LIUSHEN_EXPLANATIONS.map((item, index) => (
          <article
            key={item.name}
            className="grid gap-4 border-b border-border py-7 md:grid-cols-[2rem_8rem_1fr] md:gap-8 md:py-8"
          >
            <span className="numeral hidden pt-1.5 text-[0.62rem] text-muted-foreground/45 md:block">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="display text-[1.3rem] leading-none">{item.name}</h3>
              <div className="label mt-2.5 whitespace-nowrap leading-relaxed tracking-[0.08em] text-muted-foreground/45">
                {item.wuxing}
                {item.direction ? ` · ${item.direction}` : ""}
                {item.animal ? ` · ${item.animal}` : ""}
              </div>
            </div>

            <div>
              <p className="text-[0.88rem] leading-relaxed text-foreground/85">
                {LEAD[item.name]}，五行属{item.wuxing}
                {item.color ? `，色${item.color}` : ""}
                {item.direction ? `，位在${item.direction}` : ""}
                {item.animal ? `。临${item.animal}` : ""}
                {item.numbers ? `，凡谋事主${item.numbers}` : ""}
                。有{item.meanings}之含义。
              </p>
              <p className="classic mt-3 text-[0.86rem] leading-[2] text-muted-foreground/65">
                诀曰：{item.poem}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
