export default function Hero() {
  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-4xl font-bold">
        Win Big. Give Back. Change Lives.
      </h1>

      <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
        Play monthly draws, win rewards, and contribute to meaningful charities.
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <a
          href="/sign-up"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Get Started
        </a>

        <a
          href="#how"
          className="px-6 py-3 border rounded-lg"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}