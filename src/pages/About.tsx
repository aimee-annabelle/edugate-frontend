import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="mt-24 px-36 py-10">
      <h1 className="text-4xl font-bold text-center">About Edugate</h1>
      
      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
          <p className="text-lg">
            Edugate is dedicated to revolutionizing educational resource sharing by creating a collaborative platform where teachers and students can freely exchange knowledge and materials across different regions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Resource Sharing</h3>
              <p>Access and share educational materials including documents, presentations, and learning resources.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p>Connect with educators and students from different regions to exchange knowledge and experiences.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
              <p>Access verified and rated educational resources across various subjects and grade levels.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-4">Join Our Community</h2>
          <p className="text-lg mb-6">
            Whether you're a teacher looking to share your materials or a student seeking quality resources, Edugate provides the platform you need to enhance your educational journey.
          </p>
          <Link 
            to="/register" 
            className="bg-primary text-white px-8 py-3 rounded-md inline-block hover:bg-blue-700 transition-colors"
          >
            Get Started Today
          </Link>
        </section>
      </div>
    </div>
  );
}
