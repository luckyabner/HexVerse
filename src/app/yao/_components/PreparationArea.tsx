const notes = [
  {
    title: "心诚则灵",
    text: "起卦前静坐片刻，把注意力从杂事上收回来。",
  },
  {
    title: "一事一占",
    text: "一次只问一件事。同时问多件，卦象会互相牵扯。",
  },
  {
    title: "观变玩占",
    text: "卦象给的是结构与倾向，不是判决。决断仍在人。",
  },
];

/** 起卦须知：右侧的窄栏注释 */
export default function PreparationArea() {
  return (
    <div className="md:sticky md:top-24">
      <div className="label text-vermilion">起卦须知</div>

      <ul className="mt-5 space-y-5 border-t border-border pt-5">
        {notes.map((note, index) => (
          <li key={note.title} className="grid grid-cols-[1.25rem_1fr] gap-3">
            <span className="numeral pt-0.5 text-[0.62rem] text-muted-foreground/45">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="text-[0.85rem]">{note.title}</div>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-muted-foreground">
                {note.text}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="classic mt-8 border-t border-border pt-5 text-[0.8rem] leading-[2] text-muted-foreground/70">
        「不诚不占，
        <br />
        不疑不占，
        <br />
        不义不占。」
      </p>
    </div>
  );
}
