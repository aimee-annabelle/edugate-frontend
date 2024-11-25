export default function Landing() {
  return (
    <div className="mt-24 px-36 py-24 text-center">
      <h1 className="text-6xl font-bold">
        A platform where teachers and students get to{" "}
        <span className="text-primary">share their knowledge</span> and
        <span className="text-primary"> resources.</span>
      </h1>
      <p className="text-3xl mt-10 w-1/2 mx-auto">
        Edugate provides all necessary material to generate and access resources
        from accross different regions
      </p>
      <button className="bg-primary text-white text-lg px-16 py-3 rounded-md mt-10">
        Get Started
      </button>
    </div>
  );
}
