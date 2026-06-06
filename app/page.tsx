import Link from "next/link";
import { PatternA } from "./pattern-a";

export default function Home() {
  return (
    <>
      <PatternA />
      <Link className="floatingSwitch" href="/pattern-b">
        Pattern B
      </Link>
    </>
  );
}
