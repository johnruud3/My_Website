import ImageSlider from "./components/ImageSlider";
import StackingCards from "./components/StackingCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-main font-sans">
      <main className="w-full">
        <div className="flex w-full justify-center py-16">
          <p className="text-black text-2xl font-semibold">Welcome, my name is John</p>
        </div>

        <div className="mb-5" />

        <ImageSlider />

        <StackingCards />
      </main>
    </div>
  );
}
