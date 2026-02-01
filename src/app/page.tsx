import ImageSlider from "./components/ImageSlider";
import StackingCards from "./components/StackingCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-main font-sans">
      <header className="w-full py-6">
        <nav className="flex justify-center gap-12">
          <a href="#" className="text-[#34C1E3] text-sm font-medium hover:text-[#146C82] transition-colors">About</a>
          <a href="#" className="text-[#34C1E3] text-sm font-medium hover:text-[#146C82] transition-colors">Projects</a>
          <a href="#" className="text-[#34C1E3] text-sm font-medium hover:text-[#146C82] transition-colors">Contact</a>
        </nav>
      </header>
      <main className="w-full">
        <div className="flex flex-col w-full items-center py-10">
          <p className="text-[#34C1E3] text-3xl font-semibold">Welcome!</p>
          <p className="text-white text-2xl font-semibold">My name is <span className="text-[#34C1E3]">John</span>!</p>
        </div>


        <div className="mb-2" />

        <ImageSlider />

        <StackingCards />
      </main>
    </div>
  );
}
