import Waves, { WavesDirection } from "../components/Waves/Waves";

export default function Home() {
  return (
    <>
      <Waves wavesDirection={WavesDirection.Down} wavesNumber={3} wavesColor="#800080" wavesSpeed={20} />
    </>
  );
}
