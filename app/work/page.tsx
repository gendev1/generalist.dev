export default function workPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>on a mission to build next generation products. here's a summary of my work so far.</p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">northeastern university</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">open source contributor & developer, jun. 2023 – dec. 2023</p>
        <ul>
          <li>spearheaded the upgrade and optimization of a legacy javascript codebase to es6 standards, significantly improving maintainability.</li>
          <li>applied spring boot and hibernate in backend development, resulting in more responsive server interactions and enhanced data handling.</li>
          <li>restructured and documented a dense 7000-line codebase using webpack, enhancing its clarity, efficiency, and usability.</li>
          <li>conducted educational workshops on es6 features and best practices, elevating the technical capabilities of the development community.</li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">fidelity investments</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">software engineer co-op, jan. 2023 – jun. 2023</p>
        <ul>
          <li>orchestrated in-depth research into lightning network implementations, deriving insights that crucially informed our implementation strategy.</li>
          <li>conducted a thorough analysis of 7 competitor apps, leading to significant improvements in our own technology stack.</li>
          <li>developed and deployed a node.js-based bitcoin wallet application, integrating lightning payment features and enhancing user experience through social sharing capabilities.</li>
          <li>integrated lightning payment and social sharing features using mongodb and atlas functions, significantly enhancing the app’s user experience and market competitiveness.</li>
          <li>developed an inventive proof-of-concept using node.js and ethers.js, translating transaction hashes into user-friendly formats.</li>
          <li>showcased the application to over 200 colleagues, receiving high praise and recognition.</li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">northeastern university</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">react js / wordpress developer, apr. 2022 – dec. 2022</p>
        <ul>
          <li>led the refactoring of a critical wordpress plugin using react, reducing the codebase size by 60% and enhancing functionality.</li>
          <li>developed and integrated 6 new gutenberg blocks that enhanced data retrieval capabilities, impacting over 40 websites.</li>
          <li>implemented docker and kubernetes in ci/cd processes, optimizing deployment operations and contributing to a more efficient workflow.</li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">atelia software</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">full stack developer, aug. 2021 – dec. 2021</p>
        <ul>
          <li>led a specialized team in developing flutter plugins for a healthcare application, integrating sensors for patient monitoring and data collection.</li>
          <li>successfully integrated vital insurance and medical data from renowned platforms like epic and medicare, streamlining patient data processing.</li>
          <li>designed and implemented scalable microservices, serving restful apis with node.js and express.</li>
          <li>developed an open-source firebase firestore adapter for pycasbin, tailoring it for healthcare applications.</li>
        </ul>
      </div>
    </section>
  );
}
