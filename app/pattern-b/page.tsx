import Link from "next/link";
import { PatternB } from "../pattern-b";

export default function PatternBPage() {
  return (
    <>
      <PatternB />
      <Link className="floatingSwitch floatingSwitchLight" href="/">
        Pattern A
      </Link>
    </>
  );
}
